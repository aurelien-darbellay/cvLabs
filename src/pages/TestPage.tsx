import { useEffect, useState } from "react";
import {
  cvExperienceRelations,
  cvEducationRelations,
  cvTechSkillRelations,
  cvSoftSkillRelations,
  cvSummaryRelations,
  cvProfessionRelations,
  cvLanguageRelations,
} from "@/services/cv/CvRelationsService";
import { experienceService } from "@/services/experience/ExperienceService";
import { educationService } from "@/services/education/EducationService";
import { techSkillService } from "@/services/skills/TechSkillService";
import { softSkillService } from "@/services/skills/SoftSkillService";
import { summaryService } from "@/services/summary/SummaryService";
import { professionService } from "@/services/profession/ProfessionService";
import { languageService } from "@/services/skills/LanguageService";

const TEST_USER_ID = "0426c115-e35e-407d-926f-49e0ba90f724";
const TEST_CV_ID = 1;
const TEST_LANG = "en";

interface TestResult {
  service: string;
  status: "loading" | "success" | "error";
  count?: number;
  error?: string;
}

export default function TestPage() {
  const [results, setResults] = useState<TestResult[]>([
    { service: "Experience", status: "loading" },
    { service: "Education", status: "loading" },
    { service: "TechSkill", status: "loading" },
    { service: "SoftSkill", status: "loading" },
    { service: "Summary", status: "loading" },
    { service: "Profession", status: "loading" },
    { service: "Language", status: "loading" },
  ]);

  useEffect(() => {
    const runTests = async () => {
      const testResults: TestResult[] = [];

      // Test Experience
      try {
        const experiences = await experienceService.getAll(TEST_USER_ID);
        const experiencesInCv = await cvExperienceRelations.getAssetsForCv(
          TEST_CV_ID,
          experiences,
          TEST_LANG
        );
        testResults.push({
          service: "Experience",
          status: "success",
          count: experiencesInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "Experience",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      // Test Education
      try {
        const education = await educationService.getAll(TEST_USER_ID);
        const educationInCv = await cvEducationRelations.getAssetsForCv(
          TEST_CV_ID,
          education,
          TEST_LANG
        );
        testResults.push({
          service: "Education",
          status: "success",
          count: educationInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "Education",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      // Test TechSkill
      try {
        const techSkills = await techSkillService.getAll(TEST_USER_ID);
        const techSkillsInCv = await cvTechSkillRelations.getAssetsForCv(
          TEST_CV_ID,
          techSkills,
          TEST_LANG
        );
        testResults.push({
          service: "TechSkill",
          status: "success",
          count: techSkillsInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "TechSkill",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      // Test SoftSkill
      try {
        const softSkills = await softSkillService.getAll(TEST_USER_ID);
        const softSkillsInCv = await cvSoftSkillRelations.getAssetsForCv(
          TEST_CV_ID,
          softSkills,
          TEST_LANG
        );
        testResults.push({
          service: "SoftSkill",
          status: "success",
          count: softSkillsInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "SoftSkill",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      // Test Summary
      try {
        const summaries = await summaryService.getAll(TEST_USER_ID);
        const summariesInCv = await cvSummaryRelations.getAssetsForCv(
          TEST_CV_ID,
          summaries,
          TEST_LANG
        );
        testResults.push({
          service: "Summary",
          status: "success",
          count: summariesInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "Summary",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      // Test Profession
      try {
        const professions = await professionService.getAll(TEST_USER_ID);
        const professionsInCv = await cvProfessionRelations.getAssetsForCv(
          TEST_CV_ID,
          professions,
          TEST_LANG
        );
        testResults.push({
          service: "Profession",
          status: "success",
          count: professionsInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "Profession",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      // Test Language
      try {
        const languages = await languageService.getAll(TEST_USER_ID);
        const languagesInCv = await cvLanguageRelations.getAssetsForCv(
          TEST_CV_ID,
          languages,
          TEST_LANG
        );
        testResults.push({
          service: "Language",
          status: "success",
          count: languagesInCv.length,
        });
      } catch (err) {
        testResults.push({
          service: "Language",
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }

      setResults(testResults);
    };

    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          CV Relations Service Tests
        </h1>

        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.service}
              className={`p-4 rounded-lg border-2 ${
                result.status === "loading"
                  ? "bg-blue-50 border-blue-200"
                  : result.status === "success"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">
                  {result.service}
                </span>
                <span
                  className={`text-sm font-medium ${
                    result.status === "loading"
                      ? "text-blue-600"
                      : result.status === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {result.status === "loading" && "⏳ Loading..."}
                  {result.status === "success" &&
                    `✓ ${result.count ?? 0} items`}
                  {result.status === "error" && `✗ Error`}
                </span>
              </div>
              {result.error && (
                <p className="mt-2 text-sm text-red-700">{result.error}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold text-gray-900 mb-2">Test Config</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>User ID: {TEST_USER_ID}</li>
            <li>CV ID: {TEST_CV_ID}</li>
            <li>Language: {TEST_LANG}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
