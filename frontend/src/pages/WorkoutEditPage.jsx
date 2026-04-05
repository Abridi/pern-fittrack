import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Activity, 
  Clock, 
  Flame, 
  Save, 
  CheckCircle 
} from 'lucide-react';

const exerciseTypes = [
  'Running', 'Weights', 'Yoga', 'Cardio', 'HIIT', 'Cycling', 'Swimming', 'Pilates'
];

const WorkoutEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    exerciseType: '',
    durationMinutes: '',
    caloriesBurned: '',
    date: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workoutNotFound, setWorkoutNotFound] = useState(false);

  useEffect(() => {
    fetchWorkout();
  }, [id]);

  const fetchWorkout = async () => {
    try {
      setLoading(true);
      // Replace with actual API call: GET /api/workouts/${id}
      const mockWorkout = {
        id,
        exerciseType: 'Weights',
        durationMinutes: 60,
        caloriesBurned: 650,
        date: '2026-03-29T16:30:00Z',
        notes: 'Chest day - personal best!'
      };
      
      if (!mockWorkout) {
        setWorkoutNotFound(true);
        return;
      }
      
      // Format date for input
      const formattedDate = new Date(mockWorkout.date).toISOString().slice(0, 16);
      
      setFormData({
        exerciseType: mockWorkout.exerciseType,
        durationMinutes: mockWorkout.durationMinutes.toString(),
        caloriesBurned: mockWorkout.caloriesBurned.toString(),
        date: formattedDate,
        notes: mockWorkout.notes || ''
      });
    } catch (error) {
      console.error('Error fetching workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // API call to update workout: PUT /api/workouts/${id}
      console.log('Updating workout:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - redirect to workouts list
      navigate('/workouts');
    } catch (error) {
      console.error('Error updating workout:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (workoutNotFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-red-100 dark:bg-red-900/50 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Activity className="w-16 h-16 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
            Workout Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            The workout you're looking for doesn't exist.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/workouts')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
          >
            View All Workouts
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-green-900 p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.button
          whileHover={{ scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-semibold transition-colors"
          onClick={() => navigate('/workouts')}
        >
          <ArrowLeft size={24} />
          Back to Workouts
        </motion.button>

        {/* Edit Form */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 dark:border-gray-700/50">
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Save className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 dark:from-white via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Edit Workout
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Update your session details
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Exercise Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Exercise Type
              </label>
              <select
                name="exerciseType"
                value={formData.exerciseType}
                onChange={handleChange}
                required
                disabled={saving}
                className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all disabled:opacity-50"
              >
                <option value="">Select exercise...</option>
                {exerciseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Duration & Calories */}
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
                  disabled={saving}
                  className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all disabled:opacity-50"
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
                  disabled={saving}
                  className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all disabled:opacity-50"
                />
              </div>
            </div>

            {/* Date */}
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
                disabled={saving}
                className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-2xl font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                disabled={saving}
                placeholder="How did it feel? Any personal records?"
                className="w-full p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 border-2 border-white/30 dark:border-gray-600/50 backdrop-blur-xl text-xl font-semibold text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-all disabled:opacity-50 resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <CheckCircle className="w-8 h-8" />
                  Update Workout
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkoutEditPage;