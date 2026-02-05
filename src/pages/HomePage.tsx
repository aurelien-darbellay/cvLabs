import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCvs } from "@/hooks/useCvs";
import { useEducationList } from "@/hooks/useEducation";
import { useExperienceList } from "@/hooks/useExperience";
import { useSoftSkills, useTechSkills } from "@/hooks/useSkills";
import { useLanguageSkills } from "@/hooks/useLanguageSkills";
import { useAuth } from "@/hooks/useAuth";
import { AuthButton } from "@/components/auth/AuthButton";
import { UserProfileModal } from "@/components/user/UserProfileModal";
import { CvsSection } from "@/components/cv/CvsSection";
import { AssetsGrid } from "@/components/dashboard/AssetsGrid";
import { useUser } from "@/hooks/useUser";
import { useSummaries } from "@/hooks/useSummary";
import { useProfessionList } from "@/hooks/useProfession";

export default function HomePage() {
  const { user: authenUser } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const userId = authenUser?.id;
  const { user, refetchUser } = useUser(userId);
  const navigate = useNavigate();

  const { cvs, loading: loadingCvs, refetchCvs } = useCvs([userId]);
  const { education, loading: loadingEducation } = useEducationList(userId);
  const { experience, loading: loadingExperience } = useExperienceList(userId);
  const { languageSkills, loading: loadingLanguageSkills } =
    useLanguageSkills(userId);
  const { softSkills, loading: loadingSoftSkills } = useSoftSkills(userId);
  const { techSkills, loading: loadingTechSkills } = useTechSkills([userId]);
  const { summaries, loading: loadingSummaries } = useSummaries(userId);
  const { professions, loading: loadingProfessions } =
    useProfessionList(userId);

  const loading =
    loadingCvs ||
    loadingEducation ||
    loadingExperience ||
    loadingLanguageSkills ||
    loadingSoftSkills ||
    loadingTechSkills ||
    loadingSummaries ||
    loadingProfessions;

  const assetData = {
    education,
    experience,
    languageSkills,
    professions,
    techSkills,
    softSkills,
    summaries,
  };
  const handleViewCv = useCallback(
    (cvId: number, path?: string) => {
      navigate(`/cv/${cvId}${path || ""}`, { state: { ...assetData } });
    },
    [navigate, assetData]
  );

  const handleProfileSuccess = useCallback(() => {
    // Refetch user data if needed
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="mt-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome, {user.fullName || user.id}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full md:w-auto">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Edit Profile
            </button>
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Profile Modal */}
        <UserProfileModal
          user={user}
          isOpen={profileModalOpen}
          onClose={() => {
            setProfileModalOpen(false);
            refetchUser();
          }}
          onSuccess={handleProfileSuccess}
        />

        {/* CVs Section */}
        <CvsSection
          cvs={cvs}
          loading={loading}
          onCvCreated={refetchCvs}
          onCvDeleted={refetchCvs}
          onViewCv={handleViewCv}
          onCvUpdated={refetchCvs}
        />

        {/* Assets Grid */}
        <AssetsGrid
          education={education}
          experience={experience}
          professions={professions}
          techSkills={techSkills}
          softSkills={softSkills}
          summaries={summaries}
          languageSkills={languageSkills}
        />
      </div>
    </div>
  );
}
