import React, { useState } from "react";
import { authService } from "@/services/auth";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { error: authError } = isRegistering
                ? await authService.signUp(email, password)
                : await authService.signIn(email, password);

            if (authError) {
                setError(authError.message);
            } else {
                onClose();
                // Reset form
                setEmail("");
                setPassword("");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1001,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    width: "300px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ marginTop: 0 }}>{isRegistering ? "Register" : "Login"}</h2>

                {error && (
                    <div style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: "100%", padding: "0.5rem", boxSizing: "border-box" }}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{ padding: "0.5rem", cursor: "pointer" }}>
                        {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
                    </button>
                </form>

                <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem" }}>
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{ background: "none", border: "none", color: "blue", textDecoration: "underline", cursor: "pointer" }}
                    >
                        {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
                    </button>
                </div>

                <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#666" }}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
