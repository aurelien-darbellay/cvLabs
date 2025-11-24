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
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1001]"
            onClick={onClose}
        >
            <div
                className="bg-white p-8 rounded-lg w-80 shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mt-0 text-2xl font-bold mb-4">{isRegistering ? "Register" : "Login"}</h2>

                {error && (
                    <div className="text-red-600 mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        className="bg-transparent border-none text-blue-600 underline cursor-pointer hover:text-blue-800"
                    >
                        {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
                    </button>
                </div>

                <div className="mt-2 text-center">
                    <button
                        onClick={onClose}
                        className="bg-transparent border-none cursor-pointer text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
