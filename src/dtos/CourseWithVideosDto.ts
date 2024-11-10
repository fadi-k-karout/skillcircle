// CourseWithVideosDto.ts
import { CourseDto } from './CourseDtos';
import { VideoDto } from './VideoDtos';

export type CourseWithVideosDto = {
    course: CourseDto;                // Course information
    videos: VideoDto[];               // List of videos in the course
    totalVideoCount: number;          // Total number of videos
    averageRating?: number;           // Average rating, optional
};
