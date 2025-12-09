import { useAuth } from "@/hooks/useAuth";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

export default function LandingPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-lg text-slate-600">Loading...</p>
      </div>
    );
  }

  return user ? <HomePage /> : <LoginPage />;
}
