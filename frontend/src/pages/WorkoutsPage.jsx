import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  Flame, 
  Calendar, 
  Edit3, 
  Trash2,
  Plus,
  ArrowLeft,
  Search 
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

const WorkoutsPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      const mockWorkouts = [
        { id: '1', exerciseType: 'Running', durationMinutes: 45, caloriesBurned: 420, date: '2026-03-28T10:00:00Z', notes: 'Morning run' },
        { id: '2', exerciseType: 'Weights', durationMinutes: 60, caloriesBurned: 650, date: '2026-03-29T16:30:00Z', notes: 'Chest day' },
        { id: '3', exerciseType: 'Yoga', durationMinutes: 30, caloriesBurned: 180, date: '2026-03-30T07:00:00Z', notes: 'Morning flow' }
      ];
      setWorkouts(mockWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkouts = workouts.filter(w => 
    w.exerciseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteWorkout = async (id) => {
    if (confirm('Delete this workout?')) {
      // API call to delete
      setWorkouts(workouts.filter(w => w.id !== id));
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mb-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 dark:from-white via-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Workouts
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-xl">
              {workouts.length} total sessions tracked
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
          >
            <Plus size={24} />
            Add Workout
          </motion.button>
        </div>

        {/* Search */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-2xl font-semibold text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Workouts List */}
        <div className="space-y-6">
          {filteredWorkouts.map((workout) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 dark:border-gray-700/50 group hover:shadow-2xl transition-all"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-2xl">
                    <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">
                      {workout.exerciseType}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                      {workout.notes || 'Great session!'}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{workout.durationMinutes} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame size={16} />
                        <span>{workout.caloriesBurned.toFixed(0)} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{format(parseISO(workout.date), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-2xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
                    onClick={() => window.location.href = `/workouts/${workout.id}/edit`}
                  >
                    <Edit3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-red-100 dark:bg-red-900/50 rounded-2xl hover:bg-red-200 dark:hover:bg-red-800 transition-all"
                    onClick={() => deleteWorkout(workout.id)}
                  >
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <Activity className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-gray-500 dark:text-gray-400 mb-4">
              No workouts found
            </h3>
            <p className="text-xl text-gray-400 dark:text-gray-500 mb-8">
              {searchTerm ? 'Try a different search term' : 'Get started by logging your first workout'}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
            >
              Log First Workout
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WorkoutsPage;