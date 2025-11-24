import React, { useEffect, useState } from "react";
import { authService } from "@/services/auth";
import { AuthModal } from "./AuthModal";
import { User } from "@supabase/supabase-js";

export const AuthButton: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Get initial user
        authService.getUser().then(setUser);

        // Subscribe to auth changes
        const subscription = authService.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleClick = async () => {
        if (user) {
            await authService.signOut();
        } else {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`fixed top-2.5 right-2.5 z-[1000] px-4 py-2 text-white border-none rounded cursor-pointer shadow-md ${user ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
            >
                {user ? "Logout" : "Login / Register"}
            </button>

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
