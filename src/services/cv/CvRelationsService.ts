import { TechSkillRow } from "@/domain/TechSkill";
import { supabase } from "@/lib/supabaseClient";

export interface CvExperienceRow {
  id: number;
  owner_id: string;
  cv_id: number;
  experience_id: number;
  position: number;
  visible: boolean;
}

export interface CvEducationRow {
  id: number;
  owner_id: string;
  cv_id: number;
  education_id: number;
  position: number;
  visible: boolean;
}

export interface CvTechSkillRow {
  id: number;
  owner_id: string;
  cv_id: number;
  techskill_id: number;
  position: number;
  visible: boolean;
}

export class CvRelationsService {
  async listExperienceForCv(cvId: number): Promise<CvExperienceRow[]> {
    const { data, error } = await supabase
      .from("cv_experience")
      .select("*")
      .eq("cv_id", cvId)
      .order("position", { ascending: true });

    if (error) throw error;
    return (data ?? []) as CvExperienceRow[];
  }

  async addExperienceToCv(
    cvId: number,
    experienceId: number,
    position = 0
  ): Promise<CvExperienceRow> {
    const { data, error } = await supabase
      .from("cv_experience")
      .insert({ cv_id: cvId, experience_id: experienceId, position })
      .select("*")
      .single();

    if (error) throw error;
    return data as CvExperienceRow;
  }

  async setExperienceVisibility(id: number, visible: boolean): Promise<void> {
    const { error } = await supabase
      .from("cv_experience")
      .update({ visible })
      .eq("id", id);

    if (error) throw error;
  }

  async listEducationForCv(cvId: number): Promise<CvEducationRow[]> {
    const { data, error } = await supabase
      .from("cv_education")
      .select("*")
      .eq("cv_id", cvId)
      .order("position", { ascending: true });

    if (error) throw error;
    return (data ?? []) as CvEducationRow[];
  }

  async addEducationToCv(
    cvId: number,
    educationId: number,
    position = 0
  ): Promise<CvEducationRow> {
    const { data, error } = await supabase
      .from("cv_education")
      .insert({ cv_id: cvId, education_id: educationId, position })
      .select("*")
      .single();

    if (error) throw error;
    return data as CvEducationRow;
  }

  async listTechSkillsForCv(cvId: number): Promise<CvTechSkillRow[]> {
    const { data, error } = await supabase
      .from("cv_techskills")
      .select("*")
      .eq("cv_id", cvId)
      .order("position", { ascending: true });

    if (error) throw error;
    return (data ?? []) as CvTechSkillRow[];
  }
  async getTechSkillsForCv(cvId: number): Promise<TechSkillRow[]> {
    const techSkills = await this.listTechSkillsForCv(cvId);
    const techSkillIds = techSkills.map((ts) => ts.techskill_id);
    if (techSkillIds.length === 0) {
      return [];
    }
    const { data, error } = await supabase
      .from("techskills")
      .select("*")
      .in("id", techSkillIds);
    if (error) throw error;
    if (data.length === 0) {
      return [];
    }
    return data as TechSkillRow[];
  }
}

export const cvRelationsService = new CvRelationsService();
