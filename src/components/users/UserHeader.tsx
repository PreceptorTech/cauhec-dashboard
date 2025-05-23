import React, { useState } from "react";
import { Plus } from "lucide-react";
import UploadCsvModal from "./UploadCsvModal";
import SearchBar from "./SearchBar";

interface UserHeaderProps {
  activeTab: "student" | "preceptor";
  onSearch: (query: string) => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ activeTab, onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
            <p className="text-gray-500 mt-1">
              Manage {activeTab === "student" ? "students" : "preceptors"} in
              the system
            </p>
          </div>
          <div className="flex items-center gap-4">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={`Search ${
                activeTab === "student" ? "students" : "preceptors"
              } by name...`}
            />
            {activeTab === "preceptor" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#EF5157] text-white rounded-lg hover:bg-[#d9444a] transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Preceptors
              </button>
            )}
          </div>
        </div>
      </div>

      <UploadCsvModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default UserHeader;
