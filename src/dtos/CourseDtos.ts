// CourseDtos.ts
import { UserPublicInfoDto } from './UserDtos';
import { VideoCreateUpdateDto } from './VideoDtos';

export type CourseDto = {
    id: string;                      // Unique Identifier (GUID as string)
    title: string;                   // Title of the course
    description: string;             // Description of the course
    slug: string;                    // Slug for the course
    numberOfReviews: number;         // Number of reviews
    averageRating: number;           // Average rating
    creator: UserPublicInfoDto;      // Creator of the course
    isPaid: boolean;                 // Is the course paid?
    price?: number;                  // Price of the course (optional)
};

export type CourseCreateUpdateDto = {
    title: string;                   // Title of the course
    description: string;             // Description of the course
    skillId: string;                 // Foreign Key to Skill (GUID as string)
    creatorId: string;               // Foreign Key to User (GUID as string)
    isPaid: boolean;                 // Is the course paid?
    price: number;                   // Price of the course
    isPrivate: boolean;              // Is the course private?
    videos: VideoCreateUpdateDto[];  // List of videos
};
