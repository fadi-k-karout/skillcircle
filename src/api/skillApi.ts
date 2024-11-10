// skillApi.ts
import axiosInstance from './axiosInstance';
import { SkillCreateUpdateDto } from '../dtos/SkillDtos';
import {SkillWithCoursesDto} from '../dtos/SkillWithCoursesDto'
import { handleApiResponse } from '../utils/apiHelpers';

type Result<T> = {
  success: boolean;
  data: T | null;
};

export const skillApi = {
  // Create a new skill
  createSkill: async (data: SkillCreateUpdateDto): Promise<Result<null>> => {
    const response = await axiosInstance.post('/skills/create', data);
    return handleApiResponse(response);
  },

  // Update an existing skill
  updateSkill: async (skillId: string, data: SkillCreateUpdateDto): Promise<Result<null>> => {
    const response = await axiosInstance.put(`/skills/update/${skillId}`, data);
    return handleApiResponse(response);
  },

  // Delete a skill
  deleteSkill: async (skillId: string): Promise<Result<null>> => {
    const response = await axiosInstance.delete(`/skills/delete/${skillId}`);
    return handleApiResponse(response);
  },

  // Get skills with pagination
  getSkills: async (page: number, pageSize: number): Promise<Result<SkillWithCoursesDto[]>> => {
    const response = await axiosInstance.get(`/skills?page=${page}&pageSize=${pageSize}`);
    return handleApiResponse(response);
  },

  // Get a skill by its ID
  getSkillById: async (skillId: string): Promise<Result<SkillWithCoursesDto>> => {
    const response = await axiosInstance.get(`/skills/${skillId}`);
    return handleApiResponse(response);
  },

  // Add a creator to multiple skills
  addCreatorToSkills: async (creatorId: string, skillIds: string[]): Promise<Result<null>> => {
    const response = await axiosInstance.post('/skills/addCreator', { creatorId, skillIds });
    return handleApiResponse(response);
  },

  // Get all skills with paginated courses
  getAllSkillsWithPaginatedCourses: async (page: number, pageSize: number): Promise<Result<SkillWithCoursesDto[]>> => {
    const response = await axiosInstance.get(`/skills/all?page=${page}&pageSize=${pageSize}`);
    return handleApiResponse(response);
  },
};
