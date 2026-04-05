import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  LogOut, 
  ArrowLeft,
  Download,
  Edit2,
  TrendingUp,
  Activity,
  Flame 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ProfilePage = () => {
  const [userStats, setUserStats] = useState({
    totalWorkouts: 47,
    totalCalories: 28450,
    avgCalories: 605,
    longestStreak: 12,
    memberSince: '2026-01-15'
  });
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'USER'
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    // Clear auth, redirect to login
    window.location.href = '/login';
  };

  const handleSaveProfile = () => {
    setEditing(false);
    // API call to update profile
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.button
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-semibold transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} />
          Back to Dashboard
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-6 shadow-2xl flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              
              {editing ? (
                <div className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 text-xl font-bold text-center focus:border-purple-500 outline-none transition-all"
                    defaultValue={userInfo.name}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 text-lg text-center focus:border-purple-500 outline-none transition-all"
                    defaultValue={userInfo.email}
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 dark:from-white via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {userInfo.name}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-1">{userInfo.email}</p>
                  <div className="flex items-center justify-center gap-2 text-sm bg-purple-100 dark:bg-purple-900/50 px-4 py-2 rounded-xl text-purple-800 dark:text-purple-200 font-semibold">
                    <Shield className="w-4 h-4" />
                    {userInfo.role}
                  </div>
                </>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                {editing ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleSaveProfile}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setEditing(false)}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                    >
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setEditing(true)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </motion.button>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                className="w-full mt-6 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>

          {/* Stats & Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Lifetime Stats */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-purple-600" />
                Lifetime Stats
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                  <div className="text-4xl font-black text-purple-600 mb-2">{userStats.totalWorkouts}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Workouts</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30">
                  <div className="text-4xl font-black text-green-600 mb-2">{userStats.totalCalories.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Total Calories</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                  <div className="text-4xl font-black text-blue-600 mb-2">{userStats.avgCalories}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Avg Calories</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30">
                  <div className="text-4xl font-black text-orange-600 mb-2">{userStats.longestStreak}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Longest Streak</div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Member since {userStats.memberSince}
              </p>
            </div>

            {/* Recent Activity Chart */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Activity className="w-7 h-7 text-purple-600" />
                Recent Activity
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { week: 'W1', calories: 1800 },
                    { week: 'W2', calories: 2400 },
                    { week: 'W3', calories: 3200 },
                    { week: 'W4', calories: 2800 },
                  ]}>
                    <XAxis dataKey="week" stroke="currentColor" opacity={0.6} />
                    <YAxis stroke="currentColor" opacity={0.6} />
                    <Tooltip />
                    <Bar dataKey="calories" fill="#A855F7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Export Data */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50 text-center cursor-pointer group hover:shadow-3xl transition-all"
            >
              <Download className="w-16 h-16 text-purple-600 mx-auto mb-4 group-hover:rotate-12 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Export Data</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Download your workout history as CSV</p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all">
                Export All Data
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;