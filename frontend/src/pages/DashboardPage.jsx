import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Activity, 
  Calendar, 
  Users,
  ArrowRight 
} from 'lucide-react';
import { format, subDays, startOfWeek } from 'date-fns';
// import { AuthContext } from '../contexts/AuthContext';
// import api from '../services/api';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadialBarChart,
  RadialBar
} from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

const DashboardPage = () => {
//   const { state } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalCalories: 0,
    totalWorkouts: 0,
    avgCalories: 0,
    thisWeekCalories: 0,
    streakDays: 0
  });
  const [chartsData, setChartsData] = useState({
    dailyCalories: [],
    weeklyCalories: [],
    workoutTypes: [],
    goalProgress: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [workoutsRes, goalsRes] = await Promise.all([
//         api.get('/workouts/stats'),
//         api.get('/goals')
//       ]);

//       const workouts = workoutsRes.data;
//       const goals = goalsRes.data;

//       // Calculate stats
//       const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
//       const totalWorkouts = workouts.length;
//       const avgCalories = totalCalories / totalWorkouts || 0;
//       const thisWeekCalories = workouts
//         .filter(w => new Date(w.date) >= startOfWeek(new Date(), { weekStartsOn: 1 }))
//         .reduce((sum, w) => sum + w.caloriesBurned, 0);

//       // Chart data
//       const dailyCalories = Object.entries(
//         workouts.reduce((acc, w) => {
//           const date = format(new Date(w.date), 'MMM dd');
//           acc[date] = (acc[date] || 0) + w.caloriesBurned;
//           return acc;
//         }, {})
//       ).map(([date, calories]) => ({ date, calories }));

//       const weeklyCalories = Object.entries(
//         workouts.reduce((acc, w) => {
//           const week = `Week ${format(new Date(w.date), 'ww')}`;
//           acc[week] = (acc[week] || 0) + w.caloriesBurned;
//           return acc;
//         }, {})
//       ).slice(-5).map(([week, calories]) => ({ week, calories }));

//       const workoutTypes = Object.entries(
//         workouts.reduce((acc, w) => {
//           acc[w.exerciseType] = (acc[w.exerciseType] || 0) + 1;
//           return acc;
//         }, {})
//       ).map(([type, count]) => ({ type, count }));

//       setStats({
//         totalCalories: Math.round(totalCalories),
//         totalWorkouts,
//         avgCalories: Math.round(avgCalories),
//         thisWeekCalories: Math.round(thisWeekCalories),
//         streakDays: 7 // Calculate from backend
//       });

//       setChartsData({
//         dailyCalories,
//         weeklyCalories,
//         workoutTypes,
//         goalProgress: goals.map(g => ({
//           name: g.targetType,
//           progress: (g.current / g.targetValue) * 100,
//           achieved: g.achieved
//         }))
//       });

//     } catch (error) {
//       console.error('Dashboard data error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchDashboardData = async () => {
  try {
    setLoading(true);

    // ✅ Dummy workouts data
    const workouts = [
      { date: new Date(), caloriesBurned: 300, exerciseType: "Cardio" },
      { date: subDays(new Date(), 1), caloriesBurned: 450, exerciseType: "Strength" },
      { date: subDays(new Date(), 2), caloriesBurned: 200, exerciseType: "Yoga" },
      { date: subDays(new Date(), 3), caloriesBurned: 500, exerciseType: "Cardio" }
    ];

    const goals = [
      { targetType: "Calories", current: 1500, targetValue: 2000, achieved: false }
    ];

    // ✅ Same logic continues
    const totalCalories = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
    const totalWorkouts = workouts.length;
    const avgCalories = totalWorkouts ? totalCalories / totalWorkouts : 0;

    const thisWeekCalories = workouts.reduce(
      (sum, w) => sum + w.caloriesBurned,
      0
    );

    const dailyCalories = workouts.map(w => ({
      date: format(new Date(w.date), 'MMM dd'),
      calories: w.caloriesBurned
    }));

    const workoutTypes = Object.entries(
      workouts.reduce((acc, w) => {
        acc[w.exerciseType] = (acc[w.exerciseType] || 0) + 1;
        return acc;
      }, {})
    ).map(([type, count]) => ({ type, count }));

    setStats({
      totalCalories,
      totalWorkouts,
      avgCalories,
      thisWeekCalories,
      streakDays: 3
    });

    setChartsData({
      dailyCalories,
      weeklyCalories: [],
      workoutTypes,
      goalProgress: []
    });

  } catch (error) {
    console.error('Dashboard data error:', error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 dark:from-white via-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              {/* Welcome back, {state.user?.email.split('@')[0]}! */}
              Welcome back,User!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/50 backdrop-blur hover:bg-white/30 transition-all">
              <Calendar className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-2xl">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {stats.totalCalories.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide font-semibold">
            Total Calories
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">+12%</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {stats.totalWorkouts}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide font-semibold">
            Total Workouts
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-2xl">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">Avg</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {Math.round(stats.avgCalories)}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide font-semibold">
            Calories/Workout
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">This Week</span>
          </div>
          <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">
            {stats.thisWeekCalories.toLocaleString()}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wide font-semibold">
            Weekly Calories
          </p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-7xl mx-auto">
        {/* Calories Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            Calories Trend <TrendingUp className="w-5 h-5 text-green-600" />
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartsData.dailyCalories}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
                <XAxis dataKey="date" stroke="currentColor" opacity={0.6} />
                <YAxis stroke="currentColor" opacity={0.6} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Workout Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            Workout Types <BarChart3 className="w-5 h-5 text-blue-600" />
          </h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartsData.workoutTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="type"
                >
                  {chartsData.workoutTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-12 h-12 opacity-75 group-hover:opacity-100 transition-opacity" />
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Log Workout</h3>
          <p className="opacity-90">Track today's session</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-12 h-12 opacity-75 group-hover:opacity-100 transition-opacity" />
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Set Goals</h3>
          <p className="opacity-90">Update weekly targets</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-12 h-12 opacity-75 group-hover:opacity-100 transition-opacity" />
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </div>
          <h3 className="text-2xl font-bold mb-2">View Profile</h3>
          <p className="opacity-90">Check your stats</p>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;