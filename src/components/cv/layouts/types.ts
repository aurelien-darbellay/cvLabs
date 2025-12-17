import { User } from "@/domain/User";
import { ExperienceInCv } from "@/domain/elementsInCv/ExperienceInCv";
import { EducationInCv } from "@/domain/elementsInCv/EducationInCv";
import { SummaryInCv } from "@/domain/Summary";
import { SoftSkillInCv } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";
import { LanguageSkillInCv } from "@/domain/elementsInCv/LanguageSkillInCv";

export interface CvData {
  user: User;
  summary: SummaryInCv | null;
  experience: ExperienceInCv[];
  education: EducationInCv[];
  languages: LanguageSkillInCv[];
  softSkills: SoftSkillInCv[];
  techSkills: TechSkill[];
}

export interface LayoutLabels {
  summary: string;
  experience: string;
  education: string;
  skills: string;
  tech: string;
  soft: string;
  languages: string;
  contact: string;
  profile: string;
}

export interface LayoutProps {
  data: CvData;
  labels: LayoutLabels;
  ref: React.Ref<HTMLDivElement>;
}
