import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth/AuthService";
import { User, AuthChangeEvent, Session } from "@supabase/supabase-js";

const authService = new AuthService();

interface UseAuthResult {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
}

/**
 * Subscribes to Supabase auth changes and returns
 * the current user + access token (if any).
 */
export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Fetch initial session (user + token)
    authService
      .getSession()
      .then((session) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
        setAccessToken(session?.access_token ?? null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    // Subscribe to auth state changes
    const subscription = authService.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;
        setUser(session?.user ?? null);
        setAccessToken(session?.access_token ?? null);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  return { user, accessToken, loading };
}
