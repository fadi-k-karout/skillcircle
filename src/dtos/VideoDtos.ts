// VideoDtos.ts

export type VideoCreateUpdateDto = {
    title: string;                     // Title of the video
    description: string;               // Description of the video
    thumbnailTime?: string;            // Thumbnail settings, default "0s"
    isPrivate: boolean;                // Is the video private?
    isPaid: boolean;                   // Is the video paid?
    providerVideoId: string;                // Provider identifier
    creatorId: string;                 // Foreign key to Creator (GUID as string)
    courseId: string;                  // Foreign key to Course (GUID as string)
};

export type VideoDto = {
    id: string;                        // Unique identifier for the video
    title: string;                     // Title of the video
    slug: string;                      // Slug for the video
    description: string;               // Description of the video
    providerName: string;              // Name of the provider
    providerId: string;                // Provider identifier
    durationInSeconds: number;         // Duration of the video
    thumbnailTime?: string;            // Thumbnail settings, default "0s"
    isPaid: boolean;                   // Is the video paid?
    averageRating: number;             // Average rating of the video
    courseId: string;                  // Foreign key to Course (GUID as string)
};
