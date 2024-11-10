// UserDto.ts

// UserPublicInfoDto
export type UserPublicInfoDto = {
    firstName: string;
    lastName?: string;
    photoUrl?: string;
    createdAt?: Date;
};

// UserDetailsDto
export type UserDetailsDto = {
    id: string;
    firstName: string;
    lastName?: string;
    userName: string;
    email: string;
    isEmailConfirmed: boolean,
    photoUrl?: string;
};

// CreateUserDto
export type CreateUserDto = {

    email: string;
    firstName: string;
    lastName?: string;
    password: string;
};

// UpdateUserProfileDto
export type UpdateUserProfileDto = {

    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
};

// UpdatePasswordDto
export type UpdatePasswordDto = {
    userId: string;
    currentPassword: string;
    newPassword: string;
};

// ResetPasswordDto
export type ResetPasswordDto = {
    email: string;
    token: string;
    newPassword: string;
};

export type LoginDto = {
    email: string;
    password: string;
}