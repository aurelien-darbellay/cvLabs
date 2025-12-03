import { User } from "@/domain/User";
import { Experience } from "@/domain/Experience";
import { Education } from "@/domain/Education";
import { Summary } from "@/domain/Summary";
import { Language } from "@/domain/Language";
import { SoftSkill } from "@/domain/SoftSkill";
import { TechSkill } from "@/domain/TechSkill";

export interface CvData {
  user: User;
  summary: Summary | null;
  experience: Experience[];
  education: Education[];
  languages: Language[];
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
