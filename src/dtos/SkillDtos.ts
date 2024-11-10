// SkillCreateUpdateDto.ts
export type SkillCreateUpdateDto = {
    name: string;           // Name of the skill
    description: string;    // Description of the skill
};


// SkillDto.ts
export type SkillDto = {
    id: string;             // Unique Identifier
    name: string;           // Name of the skill
    slug: string;           // Slug for the skill
    description: string;    // Description of the skill
};
