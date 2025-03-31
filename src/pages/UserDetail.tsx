import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserDetailHeader from "../components/users/detail/UserDetailHeader";
import UserDetailInfo from "../components/users/detail/UserDetailInfo";
import DeleteConfirmModal from "../components/profiles/DeleteConfirmModal";
import { getUserDetail } from "../api/users";
import { UserDetails } from "../types/user";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    loading: false,
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await getUserDetail(id);
          setUser(data);
        }
      } catch (err) {
        setError("Failed to load user details");
        console.error("Error fetching user detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      setDeleteModal((prev) => ({ ...prev, loading: true }));

      await axios.delete(
        "https://backend-prod.cauhec.org/api/v1/admin/delete-user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            id: Number(id),
          },
        }
      );

      navigate("/users");
    } catch (err) {
      setError("Failed to delete user");
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error || "User not found"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserDetailHeader
        user={user}
        onDelete={() => setDeleteModal({ isOpen: true, loading: false })}
      />
      <UserDetailInfo user={user} />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, loading: false })}
        onConfirm={handleDelete}
        loading={deleteModal.loading}
      />
    </div>
  );
};

export default UserDetailPage;
