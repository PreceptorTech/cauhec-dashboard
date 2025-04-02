import React, { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle } from "lucide-react";
import { uploadCsv } from "../../api/users";

interface UploadCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadCsvModal: React.FC<UploadCsvModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setIsSuccess(false);
    setSelectedFile(null);
    setError(null);
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleChooseDifferentFile = () => {
    // Reset states
    setSelectedFile(null);
    setError(null);
    setIsSuccess(false);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Trigger file picker after a small delay to ensure state is reset
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      setIsSuccess(false);

      const result = await uploadCsv(selectedFile);
      console.log("Upload successful:", result);
      setIsSuccess(true);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload file. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload Preceptors CSV
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                Upload Successful!
              </p>
              <p className="text-sm text-gray-600 text-center mb-6">
                The CSV file has been successfully uploaded and processed.
              </p>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-[#EF5157] text-white rounded-lg hover:bg-[#d9444a] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                <div className="w-full">
                  {selectedFile ? (
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FileText className="w-10 h-10 text-[#EF5157]" />
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">Selected file:</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedFile.name}
                        </p>
                      </div>
                      <button
                        onClick={handleChooseDifferentFile}
                        className="text-sm text-[#EF5157] hover:text-[#d9444a] mt-2"
                      >
                        Choose a different file
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".csv"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center gap-3 w-full h-full"
                      >
                        <Upload className="w-10 h-10 text-gray-400" />
                        <div className="space-y-1">
                          <span className="text-sm text-gray-600 block">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-xs text-gray-500 block">
                            CSV files only
                          </span>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  disabled={isUploading}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedFile && !isUploading
                      ? "bg-[#EF5157] text-white hover:bg-[#d9444a]"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCsvModal;
