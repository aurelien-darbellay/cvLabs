import { User } from "@/domain/User";
import { ExperienceInCv } from "@/domain/ExperienceInCv";
import { EducationInCv } from "@/domain/EducationInCv";
import { Summary } from "@/domain/Summary";
import { SoftSkill } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";
import { CvLanguage } from "@/domain/CvLanguage";

export interface CvData {
  user: User;
  summary: Summary | null;
  experience: ExperienceInCv[];
  education: EducationInCv[];
  languages: CvLanguage[];
  softSkills: SoftSkill[];
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
