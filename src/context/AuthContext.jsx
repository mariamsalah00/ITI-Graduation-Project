import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

const ADMIN_ACCOUNT = {
  email: "admin@glowcare.com",
  password: "Admin123",
  role: "admin",
  name: "Admin",
};

export function AuthProvider({ children }) {
  // "users" = fake customer database, "currentUser" = active session
  const [users, setUsers] = useLocalStorage("glowcare_users", []);
  const [currentUser, setCurrentUser] = useLocalStorage(
    "glowcare_current_user",
    null,
  );

  const login = ({ email, password }) => {
    if (email === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      const session = {
        email: ADMIN_ACCOUNT.email,
        name: ADMIN_ACCOUNT.name,
        role: "admin",
      };
      setCurrentUser(session);
      return { success: true, user: session };
    }

    const match = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!match) {
      return { success: false, error: "Invalid email or password." };
    }

    const session = { email: match.email, name: match.name, role: "customer" };
    setCurrentUser(session);
    return { success: true, user: session };
  };

  const register = ({ name, email, password }) => {
    if (email === ADMIN_ACCOUNT.email) {
      return { success: false, error: "This email is reserved." };
    }
    if (users.some((u) => u.email === email)) {
      return {
        success: false,
        error: "An account with this email already exists.",
      };
    }

    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    const session = { email, name, role: "customer" };
    setCurrentUser(session);
    return { success: true, user: session };
  };

  const logout = () => setCurrentUser(null);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      isAdmin: currentUser?.role === "admin",
      login,
      register,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
