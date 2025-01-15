import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Mail, Building2, Calendar, User, Clock, BookOpen, 
  MapPin, GraduationCap 
} from "lucide-react";
import { getConnectionDetail } from "../api/connectionDetail";
import type { ConnectionDetailResponse } from "../types/connectionDetail";

const ConnectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [connectionData, setConnectionData] = useState<ConnectionDetailResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnectionDetail = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getConnectionDetail(id);
          setConnectionData(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load connection details');
      } finally {
        setLoading(false);
      }
    };

    fetchConnectionDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
      </div>
    );
  }

  if (error || !connectionData?.user) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error || 'Connection details not found'}
      </div>
    );
  }

  const { user, connectionDetails = [] } = connectionData;

  // Process connections to show the appropriate user details and filter out null users
  const processedConnections = connectionDetails
    .filter(connection => connection.sender !== null && connection.receiver !== null)
    .map(connection => {
      const currentUserId = Number(id);
      const isSender = connection.senderId === currentUserId;
      const userToShow = isSender ? connection.receiver : connection.sender;
      
      return {
        ...connection,
        displayUser: userToShow
      };
    });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Link
          to="/connections"
          className="flex items-center text-gray-600 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Connections
        </Link>

        {/* User Profile Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF1F1] flex items-center justify-center">
              <span className="text-[#EF5157] text-xl font-semibold">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{user.fullName}</h1>
              <p className="text-gray-500">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </p>
              <p className="font-medium">{user.email}</p>
            </div>

            {user.schoolName && (
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  School
                </p>
                <p className="font-medium">{user.schoolName}</p>
              </div>
            )}

            {user.workLocation && (
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  Work Location
                </p>
                <p className="font-medium">{user.workLocation}</p>
              </div>
            )}

            {user.state && (
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  State
                </p>
                <p className="font-medium">{user.state}</p>
              </div>
            )}

            {user.clinicalRole && (
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Clinical Hours
                </p>
                <p className="font-medium">{user.clinicalRole}</p>
              </div>
            )}

            {user.NumberOfClinicalHoursNeeded && (
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Hours Needed
                </p>
                <p className="font-medium">{user.NumberOfClinicalHoursNeeded}</p>
              </div>
            )}

            {user.timeline && (
              <div>
                <p className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Timeline
                </p>
                <p className="font-medium">{user.timeline}</p>
              </div>
            )}

            {user.bio && (
              <div className="col-span-full">
                <p className="text-sm text-gray-500 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Bio
                </p>
                <p className="font-medium">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Connections Section */}
        {processedConnections.length > 0 && (
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Connections
            </h2>
            
            <div className="space-y-4">
              {processedConnections.map((connection) => (
                <div key={connection.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFF1F1] flex items-center justify-center">
                        <span className="text-[#EF5157] font-medium">
                          {connection.displayUser.firstName?.[0]}{connection.displayUser.lastName?.[0]}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{connection.displayUser.fullName}</h3>
                        <p className="text-sm text-gray-500">{connection.displayUser.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      connection.status === 'accepted' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {connection.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {connection.displayUser.schoolName && (
                      <div>
                        <p className="text-gray-500">School</p>
                        <p className="font-medium">{connection.displayUser.schoolName}</p>
                      </div>
                    )}
                    {connection.displayUser.workLocation && (
                      <div>
                        <p className="text-gray-500">Work Location</p>
                        <p className="font-medium">{connection.displayUser.workLocation}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-500">Connected Since</p>
                      <p className="font-medium">
                        {new Date(connection.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionDetailPage;