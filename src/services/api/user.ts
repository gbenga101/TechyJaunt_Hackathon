import { api } from "@/lib/axios";
import type { UserProfile, UpdateProfilePayload } from "@/types/user";

/** GET /api/v1/users/me — requires Bearer token (axios interceptor handles it) */
export async function getMyProfile(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/users/me");
  return data;
}

/** PATCH /api/v1/users/me — editable fields: fullName, email, phone, location */
export async function updateMyProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  const { data } = await api.patch<UserProfile>("/users/me", payload);
  return data;
}
