import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  ArrowLeft,
  Search,
  TrendingUp 
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      // Mock data matching your Prisma Goal schema
      const mockGoals = [
        {
          id: '1',
          targetType: 'weekly_calories',
          targetValue: 3500,
          current: 2850,
          achieved: false
        },
        {
          id: '2',
          targetType: 'workouts_per_week',
          targetValue: 5,
          current: 4,
          achieved: false
        },
        {
          id: '3',
          targetType: 'total_calories',
          targetValue: 25000,
          current: 18450,
          achieved: false
        }
      ];
      setGoals(mockGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = (id) => {
    if (confirm('Delete this goal?')) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  const filteredGoals = goals.filter(g => 
    g.targetType.includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 dark:from-white via-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Goals
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              {goals.length} active goals • {goals.filter(g => g.achieved).length} achieved
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowAddGoal(true)}
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
          >
            <Plus size={24} />
            Add Goal
          </motion.button>
        </div>

        {/* Search */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Active Goals */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              Active Goals <TrendingUp className="w-5 h-5 text-orange-600" />
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredGoals.filter(g => !g.achieved).map((goal) => (
                <GoalCard key={goal.id} goal={goal} onDelete={deleteGoal} />
              ))}
            </div>
          </motion.div>

          {/* Goal Progress Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Progress Overview
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart data={goals.map(g => ({
                  name: g.targetType.replace('_', ' ').toUpperCase(),
                  value: (g.current / g.targetValue) * 100,
                  fill: COLORS[goals.indexOf(g) % COLORS.length]
                }))}>
                  <RadialBar 
                    minAngle={15} 
                    background 
                    clockWise 
                    dataKey="value"
                    cornerRadius={50}
                  />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <AddGoalModal onClose={() => setShowAddGoal(false)} onAdd={fetchGoals} />
        )}
      </motion.div>
    </div>
  );
};

// Goal Card Component
const GoalCard = ({ goal, onDelete }) => {
  const progress = (goal.current / goal.targetValue) * 100;
  const getFormattedType = (type) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-800/50 backdrop-blur-sm hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">
            {getFormattedType(goal.targetType)}
          </h4>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-600 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <span className="font-bold text-lg text-gray-700 dark:text-gray-300">
              {Math.round(progress)}%
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {goal.current.toLocaleString()} / {goal.targetValue.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
          >
            <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="p-2 bg-red-100 dark:bg-red-900/50 rounded-xl hover:bg-red-200 dark:hover:bg-red-800 transition-all"
            onClick={() => onDelete(goal.id)}
          >
            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Add Goal Modal
const AddGoalModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    targetType: '',
    targetValue: ''
  });

  const goalTypes = [
    { value: 'weekly_calories', label: 'Weekly Calories' },
    { value: 'workouts_per_week', label: 'Workouts Per Week' },
    { value: 'total_calories', label: 'Total Calories' },
    { value: 'avg_calories', label: 'Average Calories/Workout' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call: POST /api/goals
    console.log('Creating goal:', formData);
    onClose();
    onAdd(); // Refresh goals
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full border border-white/50 dark:border-gray-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Target className="w-8 h-8 text-orange-600" />
          New Goal
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Goal Type
            </label>
            <select
              name="targetType"
              value={formData.targetType}
              onChange={(e) => setFormData({...formData, targetType: e.target.value})}
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-lg focus:border-orange-500 outline-none transition-all"
              required
            >
              <option value="">Select goal type</option>
              {goalTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Target Value
            </label>
            <input
              type="number"
              name="targetValue"
              value={formData.targetValue}
              onChange={(e) => setFormData({...formData, targetValue: e.target.value})}
              min="1"
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-lg focus:border-orange-500 outline-none transition-all"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              onClick={onClose}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Create Goal
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default GoalsPage;