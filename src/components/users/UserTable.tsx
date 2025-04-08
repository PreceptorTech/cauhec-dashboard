import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import { ChevronUp, ChevronDown } from "lucide-react";

interface UserTableProps {
  users: User[];
  type: "student" | "preceptor";
}

type SortDirection = "asc" | "desc" | null;

const UserTable: React.FC<UserTableProps> = ({ users, type }) => {
  const navigate = useNavigate();
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleRowClick = (id: string) => {
    navigate(`/users/${id}`);
  };

  const handleSort = () => {
    setSortDirection((prev) => {
      if (prev === null) return "asc";
      if (prev === "asc") return "desc";
      return null;
    });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortDirection === null) return 0;
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            {type === "student" ? (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
            ) : (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Work Location
              </th>
            )}
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={handleSort}
            >
              <div className="flex items-center gap-1">
                Join Date
                {sortDirection === "asc" && <ChevronUp className="h-4 w-4" />}
                {sortDirection === "desc" && (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedUsers.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(user.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#FFF1F1] flex items-center justify-center">
                    <span className="text-[#EF5157] font-medium">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {`${user.firstName} ${user.lastName}`.trim()}
                    </div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {type === "student"
                  ? user.schoolName || "N/A"
                  : user.workLocation || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
