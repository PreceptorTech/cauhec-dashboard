import React, { useEffect, useState } from 'react';
import { Users, Activity, UserCheck, GraduationCap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDashboardStats, getPreceptorsVsStudents, DashboardStats, ComparisonData } from '../api/dashboard';

const StatCard = ({ icon: Icon, title, value, change }: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 bg-[#FFF1F1] rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#EF5157]" />
      </div>
    </div>
    <p className="text-sm mt-4">
      <span className={`font-medium ${
        parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {`${parseFloat(change) >= 0 ? '+' : ''}${change}%`}
      </span>
      {' '}vs last month
    </p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [statsData, comparison] = await Promise.all([
          getDashboardStats(),
          getPreceptorsVsStudents()
        ]);
        setStats(statsData);
        setComparisonData(comparison);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EF5157]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Active Connections"
          value={stats?.activeConnections.count || 0}
          change={stats?.activeConnections.change || '0'}
        />
        <StatCard
          icon={Activity}
          title="Active Clinical Rotation"
          value={stats?.activeClinicalRotations.count || 0}
          change={stats?.activeClinicalRotations.change || '0'}
        />
        <StatCard
          icon={UserCheck}
          title="Total Preceptor"
          value={stats?.totalPreceptors.count || 0}
          change={stats?.totalPreceptors.change || '0'}
        />
        <StatCard
          icon={GraduationCap}
          title="Total Students"
          value={stats?.totalStudents.count || 0}
          change={stats?.totalStudents.change || '0'}
        />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preceptors vs Students Comparison</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="preceptors" name="Preceptors" fill="#EF5157" />
              <Bar dataKey="students" name="Students" fill="#F7A7A9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;