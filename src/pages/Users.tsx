import React, { useState, useEffect, useCallback } from "react";
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filterUsers = useCallback((users: User[], query: string) => {
    if (!query) return users;
    const lowerQuery = query.toLowerCase();
    return users.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(lowerQuery)
    );
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers(activeTab);
        setUsers(data);
        setFilteredUsers(filterUsers(data, searchQuery));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab, filterUsers, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredUsers(filterUsers(users, query));
  };

  return (
    <div>
      <UserHeader activeTab={activeTab} onSearch={handleSearch} />
      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
        </div>
      ) : (
        <UserTable users={filteredUsers} type={activeTab} />
      )}
    </div>
  );
};

export default Users;
