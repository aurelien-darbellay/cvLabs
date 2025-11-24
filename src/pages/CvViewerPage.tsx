import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CvViewer } from "@/components/cv/CvViewer";
import { Cv } from "@/domain/Cv";
import { supabase } from "@/lib/supabaseClient";

export default function CvViewerPage() {
    const { cvId } = useParams<{ cvId: string }>();
    const navigate = useNavigate();
    const [cv, setCv] = useState<Cv | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCv = async () => {
            if (!cvId) {
                setError("No CV ID provided");
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("cvs")
                    .select("*")
                    .eq("id", cvId)
                    .single();

                if (error) throw error;
                if (!data) throw new Error("CV not found");

                setCv(Cv.fromRow(data));
            } catch (err) {
                console.error("Error fetching CV:", err);
                setError(err instanceof Error ? err.message : "Failed to load CV");
            } finally {
                setLoading(false);
            }
        };

        fetchCv();
    }, [cvId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl">Loading CV...</p>
            </div>
        );
    }

    if (error || !cv) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <p className="text-xl text-red-600">{error || "CV not found"}</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return <CvViewer cv={cv} onClose={() => navigate("/")} />;
}
