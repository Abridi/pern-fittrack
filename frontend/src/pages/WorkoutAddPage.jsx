import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Clock, Flame, Plus } from 'lucide-react';

const exerciseTypes = [
  'Running', 'Weights', 'Yoga', 'Cardio', 'HIIT', 'Cycling', 'Swimming', 'Pilates'
];

const WorkoutAddPage = () => {
  const [formData, setFormData] = useState({
    exerciseType: '',
    durationMinutes: '',
    caloriesBurned: '',
    date: new Date().toISOString().slice(0, 16),
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // API call to create workout
      console.log('Creating workout:', formData);
      // Redirect to workouts page after success
      setTimeout(() => {
        window.location.href = '/workouts';
      }, 1500);
    } catch (error) {
      console.error('Error creating workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <motion.button
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition-colors"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} />
          Back to Workouts
        </motion.button>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 dark:border-gray-700/50">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Plus className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 dark:from-white via-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Log Workout
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Track your session details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Exercise Type
              </label>
              <select
                name="exerciseType"
                value={formData.exerciseType}
                onChange={handleChange}
                required
                className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-all"
              >
                <option value="">Select exercise...</option>
                {exerciseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="durationMinutes"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  min="1"
                  max="600"
                  required
                  className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <Flame className="w-5 h-5" />
                  Calories Burned
                </label>
                <input
                  type="number"
                  name="caloriesBurned"
                  value={formData.caloriesBurned}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  required
                  className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="How did it feel? Any personal records?"
                className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-xl font-semibold text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-all resize-vertical"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Activity className="w-8 h-8" />
                  Log Workout
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkoutAddPage;