import React, { useState, useEffect } from "react";
import UserHeader from "../components/users/UserHeader";
import UserTabs from "../components/users/UserTabs";
import UserTable from "../components/users/UserTable";
import { getUsers } from "../api/users";
import { User } from "../types/user";

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"student" | "preceptor">(
    "student"
  );
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers(activeTab);
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]);

  return (
    <div>
      <UserHeader activeTab={activeTab} />
      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
        </div>
      ) : (
        <UserTable users={users} type={activeTab} />
      )}
    </div>
  );
};

export default Users;
