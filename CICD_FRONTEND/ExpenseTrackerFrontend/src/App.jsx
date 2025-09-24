import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import UserNavBar from "./user/UserNavBar";
import SupervisorNavBar from "./supervisor/SupervisorNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";

function AppContent() {
  const { isAdminLoggedIn, isUserLoggedIn, isSupervisorLoggedIn } = useAuth();

  if (isAdminLoggedIn) return <AdminNavBar />;
  if (isSupervisorLoggedIn) return <SupervisorNavBar />;
  if (isUserLoggedIn) return <UserNavBar />;
  return <MainNavBar />; // default for not logged in
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
