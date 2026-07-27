import type { UserRole } from "./auth";

export interface UserLocation {
  lga: string;
  state: string;
  addressLine?: string;
}

/** Full user document returned by GET /api/v1/users/me */
export interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  location: UserLocation;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Body accepted by PATCH /api/v1/users/me */
export interface UpdateProfilePayload {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: {
    lga: string;
    state: string;
  };
}
