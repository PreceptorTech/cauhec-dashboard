import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import { getProfiles } from "../api/profiles";
import { Profile } from "../types/profile";
import CreateAdminModal from "../components/profiles/CreateAdminModal";
import DeleteConfirmModal from "../components/profiles/DeleteConfirmModal";
import axios from "axios";

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState<{
    isOpen: boolean;
    id: number | null;
    loading: boolean;
  }>({
    isOpen: false,
    id: null,
    loading: false,
  });

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleDelete = async () => {
    if (!deleteModalData.id) return;

    try {
      setDeleteModalData((prev) => ({ ...prev, loading: true }));

      await axios.delete(
        "https://backend-prod.cauhec.org/api/v1/admin/delete-admin-user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            id: deleteModalData.id,
          },
        }
      );

      await fetchProfiles();
      setDeleteModalData({ isOpen: false, id: null, loading: false });
    } catch (err) {
      setError("Failed to delete admin");
      setDeleteModalData((prev) => ({ ...prev, loading: false }));
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Profiles</h1>
          <p className="text-gray-500 mt-1">
            Manage user profiles and credentials
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#EF5157] text-white rounded-lg hover:bg-[#D64147] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Admin
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Icon
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex">
                    <div className="h-10 w-10 rounded-full bg-[#FFF1F1] flex items-center justify-center">
                      <span className="text-[#EF5157] font-medium">
                        {getInitials(profile.name)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{profile.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{profile.role}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() =>
                      setDeleteModalData({
                        isOpen: true,
                        id: profile.id,
                        loading: false,
                      })
                    }
                    className="text-gray-400 cursor-not-allowed"
                    disabled
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchProfiles}
      />

      <DeleteConfirmModal
        isOpen={deleteModalData.isOpen}
        onClose={() =>
          setDeleteModalData({ isOpen: false, id: null, loading: false })
        }
        onConfirm={handleDelete}
        loading={deleteModalData.loading}
      />
    </div>
  );
};

export default Profiles;
