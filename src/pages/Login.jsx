import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, ClipboardCheck, AlertCircle } from 'lucide-react';
import AttendanceTracker from '../components/AttendanceTracker';
import { AnimatedCard } from '../components/AnimatedCard';
import { PageTransition } from '../components/PageTransition';

function Login() {
  const navigate = useNavigate();
  const [showAttendanceTracker, setShowAttendanceTracker] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (!user) {
        setError('Invalid credentials');
        return;
      }

      if (user.role !== formData.role) {
        setError(`This email is registered as a ${user.role}. Please select the correct role.`);
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      navigate(user.role === 'teacher' ? '/dashboard' : '/student-dashboard');
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <motion.div 
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => setShowAttendanceTracker(false)}
              className={`neu-button flex items-center ${!showAttendanceTracker ? 'animate-pulse-shadow' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </motion.button>
            <motion.button
              onClick={() => setShowAttendanceTracker(true)}
              className={`neu-button flex items-center ${showAttendanceTracker ? 'animate-pulse-shadow' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ClipboardCheck className="h-4 w-4 mr-2" />
              Check Attendance
            </motion.button>
          </motion.div>

          {showAttendanceTracker ? (
            <AnimatedCard>
              <div className="neu-card">
                <AttendanceTracker />
              </div>
            </AnimatedCard>
          ) : (
            <AnimatedCard>
              <div className="neu-card">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-center text-3xl neu-title mb-8">
                    Sign in to your account
                  </h2>
                </motion.div>

                <motion.form 
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {error && (
                    <motion.div 
                      className="p-4 rounded-xl bg-red-50 flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-sm text-red-600">{error}</p>
                    </motion.div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email-address" className="block text-sm neu-text mb-2">
                        Email address
                      </label>
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="neu-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm neu-text mb-2">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="neu-input"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm neu-text mb-2">
                        I am a:
                      </label>
                      <select
                        className="neu-select"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="neu-button w-full"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </motion.form>

                <div className="text-center mt-4">
                  <Link
                    to="/Register"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Login;