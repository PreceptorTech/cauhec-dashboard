import React from "react";
import { ArrowLeft, Mail, MapPin, Calendar, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { UserDetails } from "../../../types/user";

interface UserDetailHeaderProps {
  user: UserDetails;
  onDelete: () => void;
}

const UserDetailHeader: React.FC<UserDetailHeaderProps> = ({
  user,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <Link
          to="/users"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Users
        </Link>
        <button
          onClick={onDelete}
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg opacity-50 cursor-not-allowed"
        >
          <Trash2 className="w-5 h-5" />
          Delete User
        </button>
      </div>

      <div className="flex items-start">
        <div className="w-24 h-24 rounded-full bg-[#FFF1F1] flex items-center justify-center text-2xl font-semibold text-[#EF5157]">
          {user.firstName[0]}
          {user.lastName[0]}
        </div>
        <div className="ml-6">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</h1>
            <p className="text-gray-500">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {user.email}
            </div>
            {user?.city && (
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {user?.city}
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailHeader;
