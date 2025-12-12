import { useState, useCallback } from "react";
import { useCvs } from "@/hooks/useCvs";
import { useEducationList } from "@/hooks/useEducation";
import { useExperienceList } from "@/hooks/useExperience";
import { useLanguages, useSoftSkills, useTechSkills } from "@/hooks/useSkills";
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
  const { user } = useUser(userId);

  const { cvs, loading: loadingCvs } = useCvs([userId]);
  const { education } = useEducationList(userId);
  const { experience } = useExperienceList(userId);
  const { languages } = useLanguages([userId]);
  const { softSkills } = useSoftSkills(userId);
  const { techSkills } = useTechSkills([userId]);
  const { summaries } = useSummaries(userId);
  const { professions } = useProfessionList(userId);
  const handleProfileSuccess = useCallback(() => {
    // Refetch user data if needed
  }, []);
  /* console.log("User data in HomePage:", user);
  console.log("CVs data in HomePage:", cvs);
  console.log("Education data in HomePage:", education);
  console.log("Experience data in HomePage:", experience);
  console.log("Languages data in HomePage:", languages);
  console.log("Soft Skills data in HomePage:", softSkills);
  console.log("Tech Skills data in HomePage:", techSkills);
  console.log("Summaries data in HomePage:", summaries); 
  console.log("Professions data in HomePage:", professions);*/

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
        <div className="mt-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome, {user.fullName || user.id}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setProfileModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
            >
              Edit Profile
            </button>
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Profile Modal */}
        <UserProfileModal
          user={user}
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          onSuccess={handleProfileSuccess}
        />

        {/* CVs Section */}
        <CvsSection
          cvs={cvs}
          loading={loadingCvs}
          onCvCreated={() => {}}
          onCvDeleted={() => {}}
        />

        {/* Assets Grid */}
        <AssetsGrid
          education={education}
          experience={experience}
          professions={professions}
          techSkills={techSkills}
          softSkills={softSkills}
          summaries={summaries}
        />
      </div>
    </div>
  );
}
