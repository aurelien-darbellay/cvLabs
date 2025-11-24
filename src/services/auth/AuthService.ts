import { supabase } from "@/lib/supabaseClient";
import { Session, User, AuthChangeEvent, Subscription } from "@supabase/supabase-js";

export class AuthService {
    async signUp(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });
        return { user: data.user, session: data.session, error };
    }

    async signIn(email: string, password: string): Promise<{ user: User | null; session: Session | null; error: any }> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { user: data.user, session: data.session, error };
    }

    async signOut(): Promise<{ error: any }> {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    async getUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }

    async getSession(): Promise<Session | null> {
        const { data: { session } } = await supabase.auth.getSession();
        return session;
    }

    onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void): Subscription {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
        return subscription;
    }
}
