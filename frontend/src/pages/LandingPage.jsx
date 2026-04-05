
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// const FitnessLanding = () => {
  const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br dark:from-gray-900 dark:to-green-900 from-emerald-50 to-green-50 font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            FitTrack
          </motion.h1>
          
          {/* Theme Toggle */}
          <button
            className="p-2 rounded-xl bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-200"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-6 h-6 text-yellow-400" /> : <MoonIcon className="w-6 h-6 text-gray-800" />}
          </button>
          
          <div className="hidden md:flex space-x-4">
            <a href="/login" className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">
              Login
            </a>
            <a 
              href="/register"
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-gray-900 dark:from-white to-green-600 dark:to-green-400 bg-clip-text text-transparent">
              Track Your Fitness.
              <span className="block text-2xl md:text-4xl font-normal text-gray-600 dark:text-gray-300 mt-4">
                Transform Your Life.
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
              Log workouts, track progress, crush goals. The only fitness tracker 
              you’ll ever need with smart analytics and beautiful insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center"
              >
                Start Free Trial
              </a>
              <a 
                href="#features"
                className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl font-semibold text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center"
              >
                Watch Demo
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-green-400/20 to-emerald-400/20 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 dark:border-gray-700/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">📈</span>
                  </div>
                  <p className="font-bold text-xl text-gray-900 dark:text-white">247%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Progress</p>
                </div>
                {/* More metric cards */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 dark:from-white to-green-600 dark:to-green-400 bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed for serious fitness enthusiasts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '📱', title: 'Smart Tracking', desc: 'Log every workout with precise metrics and automatic calorie calculations' },
            { icon: '📊', title: 'Progress Analytics', desc: 'Beautiful charts and insights to visualize your fitness journey' },
            { icon: '🎯', title: 'Goal Mastery', desc: 'Set targets, get notifications, celebrate achievements' }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-green-50 dark:from-green-500/10 to-emerald-50 dark:to-green-600/10 p-8 rounded-3xl border border-green-100 dark:border-green-800/50 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-5xl font-black mb-6"
          >
            Ready to Transform Your Fitness?
          </motion.h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join 50K+ fitness enthusiasts crushing their goals with FitTrack
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="/register"
              className="px-10 py-5 bg-white text-green-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
            </a>
            <a href="/login" className="px-10 py-5 border-2 border-white/50 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-200">
              Login Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            FitTrack
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            © 2026 FitTrack. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// export default FitnessLanding;

export default LandingPage;