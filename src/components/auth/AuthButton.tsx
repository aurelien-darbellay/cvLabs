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
                style={{
                    position: "fixed",
                    top: "10px",
                    right: "10px",
                    zIndex: 1000,
                    padding: "0.5rem 1rem",
                    backgroundColor: user ? "#ff4444" : "#4444ff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
            >
                {user ? "Logout" : "Login / Register"}
            </button>

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
