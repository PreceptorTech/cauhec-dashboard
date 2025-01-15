import React, { useState, useEffect } from "react";
import ConnectionHeader from "../components/connections/ConnectionHeader";
import ConnectionFilters from "../components/connections/ConnectionFilters";
import ConnectionCard from "../components/connections/ConnectionCard";
import { Connection, ConnectionFilter } from "../types/connection";
import { getConnections } from "../api/connections";
import { useNavigate } from 'react-router-dom';

const Connections: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ConnectionFilter>({ role: 'student' });
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const data = await getConnections(filters.role);
        setConnections(data);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [filters.role]);

  const handleConnectionClick = (id: string) => {
    navigate(`/connections/${id}`);
  };

  if (loading) {
    return (
      <div>
        <ConnectionHeader />
        <ConnectionFilters filters={filters} onFilterChange={setFilters} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 space-y-4 animate-pulse">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  <div className="h-6 w-48 bg-gray-200 rounded"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <div className="pt-4 space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <ConnectionHeader />
      <ConnectionFilters filters={filters} onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection.id}
            connection={connection}
            onClick={handleConnectionClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Connections;