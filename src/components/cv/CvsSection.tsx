import { useState } from "react";
import { Cv } from "@/domain/Cv";
import { Link } from "react-router-dom";
import { cvService } from "@/services/cv/CvService";

interface CvsSectionProps {
  cvs: Cv[];
  loading: boolean;
  onCvCreated: () => void;
  onCvDeleted: () => void;
  onViewCv?: (cvId: number, path?: string) => void;
}

export function CvsSection({
  cvs,
  loading,
  onCvCreated,
  onCvDeleted,
  onViewCv,
}: CvsSectionProps) {
  const [creatingNew, setCreatingNew] = useState(false);
  const [newCvTitle, setNewCvTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateCv = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await cvService.create({
        title: newCvTitle || "Untitled CV",
      });
      setNewCvTitle("");
      setCreatingNew(false);
      onCvCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create CV");
    }
  };

  const handleDeleteCv = async (cvId: number) => {
    if (!confirm("Are you sure you want to delete this CV?")) return;

    try {
      await cvService.delete(cvId);
      onCvDeleted();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete CV");
    }
  };

  return (
    <section className="mb-8 bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My CVs</h2>
        {!creatingNew && (
          <button
            onClick={() => setCreatingNew(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + New CV
          </button>
        )}
      </div>

      {creatingNew && (
        <form
          onSubmit={handleCreateCv}
          className="mb-6 p-4 bg-blue-50 rounded-lg"
        >
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="CV Title (optional)"
              value={newCvTitle}
              onChange={(e) => setNewCvTitle(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => {
                setCreatingNew(false);
                setError(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 font-medium"
            >
              Cancel
            </button>
          </div>
          {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
        </form>
      )}

      {loading ? (
        <p className="text-gray-500">Loading CVs...</p>
      ) : cvs.length === 0 ? (
        <p className="text-gray-500">No CVs yet. Create your first one!</p>
      ) : (
        <div className="space-y-3">
          {cvs.map((cv) => (
            <div
              key={cv.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {cv.title || "(Untitled)"}
                </h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(cv.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                {onViewCv ? (
                  <>
                    <button
                      onClick={() => onViewCv(cv.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onViewCv(cv.id, "/manage-assets")}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 font-medium text-sm"
                    >
                      Manage Assets
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/cv/${cv.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/cv/${cv.id}/manage-assets`}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 font-medium text-sm"
                    >
                      Manage Assets
                    </Link>
                  </>
                )}
                <button
                  onClick={() => handleDeleteCv(cv.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
