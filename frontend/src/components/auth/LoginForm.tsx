import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { UserCircle2, Lock, AlertCircle } from "lucide-react";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(username, password);
    } catch (err) {
      setError("Invalid username or password" + (err as Error).message);
    } finally {
      setIsLoading(false);
      window.location.reload();

    }
  //   try {
  //     const data = await login(username, password);

  //     if (data.isAdmin) {
  //       navigate("/car-dashboard");       // Admin route
  //     } else {
  //       navigate("/user-car-dashboard");  // Non-admin route
  //     }
  //   } catch (err) {
  //     setError("Invalid username or password" + (err as Error).message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCircle2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                className="input pl-10"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                className="input pl-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></div>
              ) : null}
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
