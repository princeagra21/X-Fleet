export const UploadTypes = ['PROFILE', 'DARKLOGO', 'LIGHTLOGO', 'FAVICON'] as const;
export type UploadType = typeof UploadTypes[number];