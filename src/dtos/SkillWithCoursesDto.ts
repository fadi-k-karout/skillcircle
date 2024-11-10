// SkillWithCoursesDto.ts
import { SkillDto } from './SkillDtos';
import { CourseDto } from './CourseDtos';

export type SkillWithCoursesDto = {
    skill: SkillDto;                  // Skill information
    courseDtos: CourseDto[];          // List of courses related to the skill
    totalCourseCount: number;         // Total number of courses
};