import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WorkoutsPage from './pages/WorkoutsPage';
import WorkoutAddPage from './pages/WorkoutAddPage';
import WorkoutEditPage from './pages/WorkoutEditPage';
import GoalsPage from './pages/GoalsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanelPage from './pages/AdminPanelPage';

// import ProtectedRoute from './components/ProtectedRoute';

function App() {
 
  return (
    <>
<Routes>

  <Route path="/" element={<Navigate to="/landing" />} />
  <Route path="/landing" element={<LandingPage />} />
  <Route path="/register" element={<SignupPage />} />
   <Route path="/login" element={<LoginPage />} />
  <Route path="/adminpanel" element={<AdminPanelPage />} />

      {/* <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
           /> */}

  <Route path="/dashboard" element={<DashboardPage />}  />
  <Route path="/workouts" element={<WorkoutsPage />} />
  <Route path="/workouts/add" element={<WorkoutAddPage />} />
  <Route path="/workouts/:id/edit" element={<WorkoutEditPage />} />
  <Route path="/goals" element={<GoalsPage />} />
  <Route path="/profile" element={<ProfilePage />} />

</Routes>

  </>
  )
}

export default App