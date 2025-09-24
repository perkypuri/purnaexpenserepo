import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isSupervisorLoggedIn, setIsSupervisorLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // On initial load, read localStorage
  useEffect(() => {
    setIsAdminLoggedIn(localStorage.getItem("isAdminLoggedIn") === "true");
    setIsSupervisorLoggedIn(localStorage.getItem("isSupervisorLoggedIn") === "true");
    setIsUserLoggedIn(localStorage.getItem("isUserLoggedIn") === "true");
  }, []);

  // Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    localStorage.setItem("isSupervisorLoggedIn", isSupervisorLoggedIn);
    localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
  }, [isAdminLoggedIn, isSupervisorLoggedIn, isUserLoggedIn]);

  // ✅ Add logout function
  const logout = () => {
    setIsAdminLoggedIn(false);
    setIsSupervisorLoggedIn(false);
    setIsUserLoggedIn(false);
    localStorage.clear(); // clear everything
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isSupervisorLoggedIn,
        setIsSupervisorLoggedIn,
        isUserLoggedIn,
        setIsUserLoggedIn,
        logout, // ✅ expose logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);