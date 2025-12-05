import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth/AuthService";
import { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

const authService = new AuthService();

interface UseAuthResult {
  user: User | null;
  loading: boolean;
}

/**
 * Subscribes to Supabase auth changes and returns the current user (if any).
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Fetch initial user
    authService
      .getUser()
      .then((initialUser) => {
        if (mounted) setUser(initialUser);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Subscribe to auth state changes
    const subscription = authService.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return { user, loading };
}
