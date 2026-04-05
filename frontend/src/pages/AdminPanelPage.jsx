// // frontend/src/pages/AdminPanel.jsx - Complete admin dashboard
// import { useQuery } from '@tanstack/react-query';
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import { BarChart3, Users, Activity, Target, AlertCircle } from 'lucide-react';

// const AdminPanelPage = () => {
//   const { user, token } = useAuth();

//   // Fetch all users + stats
//   const { data: users, isLoading } = useQuery({
//     queryKey: ['admin-users'],
//     queryFn: () => axios.get('/api/admin/users', {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => res.data),
//     enabled: user?.role === 'ADMIN'
//   });

//   // Platform stats
//   const { data: stats } = useQuery({
//     queryKey: ['admin-stats'],
//     queryFn: () => axios.get('/api/admin/stats', {
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(res => res.data),
//     enabled: user?.role === 'ADMIN'
//   });

//   if (!user || user.role !== 'ADMIN') {
//     return <div className="p-8 text-red-500">Admin access required</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
//             FitTrack Admin Dashboard
//           </h1>
//           <p className="text-xl text-gray-600">Platform analytics & user management</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <Users className="w-12 h-12 text-emerald-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{users?.length || 0}</h3>
//             <p className="text-gray-600">Total Users</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <Activity className="w-12 h-12 text-green-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{stats?.totalWorkouts || 0}</h3>
//             <p className="text-gray-600">Workouts Logged</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <Target className="w-12 h-12 text-blue-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{stats?.goalsAchieved || 0}</h3>
//             <p className="text-gray-600">Goals Achieved</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <BarChart3 className="w-12 h-12 text-purple-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{stats?.totalCalories?.toLocaleString()}</h3>
//             <p className="text-gray-600">Calories Burned</p>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <Users className="w-7 h-7" />
//               All Users
//             </h2>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-900">Workouts</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-900">Calories</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-900">Goals</th>
//                     <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {users?.map((user) => (
//                     <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
//                       <td className="py-4 px-6">
//                         <div className="font-medium text-gray-900">{user.email}</div>
//                       </td>
//                       <td className="py-4 px-6 text-gray-700">{user.workouts?.length || 0}</td>
//                       <td className="py-4 px-6 text-gray-700">
//                         {(user.workouts?.reduce((sum, w) => sum + w.caloriesBurned, 0) || 0).toLocaleString()}
//                       </td>
//                       <td className="py-4 px-6 text-gray-700">{user.goals?.length || 0}</td>
//                       <td>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           user.role === 'ADMIN' 
//                             ? 'bg-purple-100 text-purple-800' 
//                             : 'bg-gray-100 text-gray-800'
//                         }`}>
//                           {user.role}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanelPage;

// frontend/src/pages/AdminPanel.jsx - Pure frontend, no AuthContext
// import { useState, useEffect } from 'react';
// import { BarChart3, Users, Activity, Target } from 'lucide-react';

// const AdminPanelPage = () => {
//   const [users, setUsers] = useState([]);
//   const [stats, setStats] = useState({});
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Simulate login check (localStorage or URL param)
//   useEffect(() => {
//     // Demo: Check URL ?admin=true or localStorage
//     const adminMode = new URLSearchParams(window.location.search).get('admin') === 'true';
//     setIsAdmin(adminMode);
    
//     if (adminMode) {
//       // Mock admin data
//       setUsers([
//         { id: '1', email: 'john@gmail.com', workouts: 12, caloriesBurned: 2450, goals: 3, role: 'USER' },
//         { id: '2', email: 'jane@fitness.com', workouts: 28, caloriesBurned: 3800, goals: 2, role: 'USER' },
//         { id: '3', email: 'admin@gym.com', workouts: 5, caloriesBurned: 1200, goals: 1, role: 'ADMIN' },
//         { id: '4', email: 'coach@abcgym.com', workouts: 45, caloriesBurned: 5200, goals: 5, role: 'USER' },
//       ]);
      
//       setStats({
//         totalWorkouts: 156,
//         totalCalories: 12500,
//         goalsAchieved: 23
//       });
//     }
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
//         <div className="text-center p-8 bg-red-100 border border-red-400 rounded-2xl max-w-md mx-auto">
//           <div className="text-6xl mb-4">🔒</div>
//           <h1 className="text-2xl font-bold text-red-800 mb-2">Admin Access Required</h1>
//           <p className="text-red-700 mb-6">Visit: <code className="bg-red-200 px-2 py-1 rounded font-mono">/admin?admin=true</code></p>
//           <p className="text-sm text-red-600">Demo mode for portfolio showcase</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12 flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
//               FitTrack Admin Dashboard
//             </h1>
//             <p className="text-xl text-gray-600">Platform analytics & user management (Demo)</p>
//           </div>
//           <div className="text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-xl">
//             Demo Mode Active
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <Users className="w-12 h-12 text-emerald-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{users.length}</h3>
//             <p className="text-gray-600">Total Users</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <Activity className="w-12 h-12 text-green-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{stats.totalWorkouts}</h3>
//             <p className="text-gray-600">Workouts Logged</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <Target className="w-12 h-12 text-blue-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{stats.goalsAchieved}</h3>
//             <p className="text-gray-600">Goals Achieved</p>
//           </div>

//           <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all">
//             <BarChart3 className="w-12 h-12 text-purple-500 mb-4" />
//             <h3 className="text-3xl font-bold text-gray-900">{stats.totalCalories?.toLocaleString()}</h3>
//             <p className="text-gray-600">Calories Burned</p>
//           </div>
//         </div>

//         {/* Users Table */}
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <Users className="w-7 h-7" />
//               All Users ({users.length})
//             </h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-gray-200">
//                   <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-900">Workouts</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-900">Calories</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-900">Goals</th>
//                   <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
//                     <td className="py-4 px-6">
//                       <div className="font-medium text-gray-900">{user.email}</div>
//                     </td>
//                     <td className="py-4 px-6 text-gray-700 font-semibold">{user.workouts}</td>
//                     <td className="py-4 px-6 text-gray-700">{user.caloriesBurned.toLocaleString()}</td>
//                     <td className="py-4 px-6 text-gray-700">{user.goals}</td>
//                     <td>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         user.role === 'ADMIN' 
//                           ? 'bg-purple-100 text-purple-800 border border-purple-200' 
//                           : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
//                       }`}>
//                         {user.role}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanelPage;


// frontend/src/pages/AdminPanel.jsx - Simple access gate only
import { useEffect, useState } from 'react';

const AdminPanelPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check URL param for demo
    const adminMode = new URLSearchParams(window.location.search).get('admin') === 'true';
    setIsAdmin(adminMode);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100 px-4">
        <div className="text-center p-12 bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl max-w-md mx-auto">
          <div className="text-6xl mb-6 mx-auto">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
          <div className="text-xl text-gray-700 mb-8">
            Visit: <br />
            <code className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-mono text-lg font-bold border-2 border-emerald-200 block mt-4">
              /admin?admin=true
            </code>
          </div>
          <p className="text-gray-600 text-lg">Demo mode for portfolio showcase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto text-center pt-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
          Admin Dashboard
        </h1>
        <p className="text-2xl text-gray-700 mb-8">Access granted! Full implementation coming soon.</p>
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50">
          <div className="text-7xl mb-8">✅</div>
          <p className="text-xl text-gray-800">Admin features will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;