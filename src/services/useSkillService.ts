import { useState } from 'react';
import { skillApi } from '../api/skillApi'; // Import the skillApi methods
import { useErrorContext } from '../context/ErrorContext'; // Import the error context
import { SkillCreateUpdateDto } from '../dtos/SkillDtos';
import { SkillWithCoursesDto } from '../dtos/SkillWithCoursesDto';

// Define a loading state for each action
type UseSkillService = {
  skills: SkillWithCoursesDto[];
  skill: SkillWithCoursesDto | null;
  isLoading: boolean;
  createSkill: (data: SkillCreateUpdateDto) => Promise<void>;
  updateSkill: (skillId: string, data: SkillCreateUpdateDto) => Promise<void>;
  deleteSkill: (skillId: string) => Promise<void>;
  getSkills: (page: number, pageSize: number) => void;
  getSkillById: (skillId: string) => void;
};

export const useSkillService = (): UseSkillService => {
  const { setError } = useErrorContext();  // Use the global error context
  const [skills, setSkills] = useState<SkillWithCoursesDto[]>([]);
  const [skill, setSkill] = useState<SkillWithCoursesDto | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create skill
  const createSkill = async (data: SkillCreateUpdateDto) => {
    setIsLoading(true);
    try {
      const result = await skillApi.createSkill(data);
      if (!result.success) {
        setError('Error creating skill');  // Use global error handler
      }
    } catch (err) {
      setError(err);  // Pass the error to the global context
    } finally {
      setIsLoading(false);
    }
  };

  // Update skill
  const updateSkill = async (skillId: string, data: SkillCreateUpdateDto) => {
    setIsLoading(true);
    try {
      const result = await skillApi.updateSkill(skillId, data);
      if (!result.success) {
        setError('Error updating skill');
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete skill
  const deleteSkill = async (skillId: string) => {
    setIsLoading(true);
    try {
      const result = await skillApi.deleteSkill(skillId);
      if (!result.success) {
        setError('Error deleting skill');
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get skills with pagination
  const getSkills = async (page: number, pageSize: number) => {
    setIsLoading(true);
    try {
      const result = await skillApi.getSkills(page, pageSize);
      if (result.success) {
        setSkills(result.data || []);
      } else {
        setError('Error fetching skills');
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get skill by ID
  const getSkillById = async (skillId: string) => {
    setIsLoading(true);
    try {
      const result = await skillApi.getSkillById(skillId);
      if (result.success) {
        setSkill(result.data || null);
      } else {
        setError('Error fetching skill');
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    skills,
    skill,
    isLoading,
    createSkill,
    updateSkill,
    deleteSkill,
    getSkills,
    getSkillById,
  };
};
