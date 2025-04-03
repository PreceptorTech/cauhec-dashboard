import React, { useState, useEffect } from "react";
import ConnectionHeader from "../components/connections/ConnectionHeader";
import ConnectionFilters from "../components/connections/ConnectionFilters";
import ConnectionTable from "../components/connections/ConnectionTable";
import { Connection, ConnectionFilter } from "../types/connection";
import { getAllConnections } from "../api/connections";

const Connections: React.FC = () => {
  const [filter, setFilter] = useState<string>("pending");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        const data = await getAllConnections();
        setConnections(data);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [filter]);

  const filteredConnections = connections.filter((connection) => {
    if (filter && connection.status !== filter) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div>
        <ConnectionHeader />
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200"></div>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-16 bg-white border-b border-gray-200"
              >
                <div className="px-6 py-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-4 space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ConnectionHeader />
      <ConnectionFilters filter={filter} onFilterChange={setFilter} />
      <ConnectionTable connections={filteredConnections} />
    </div>
  );
};

export default Connections;
