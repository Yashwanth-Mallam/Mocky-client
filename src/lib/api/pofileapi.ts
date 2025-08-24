import { Profile, CreateProfileData } from "@/types/profile";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Create profile (Public)
export const createProfileApi = async (data: CreateProfileData) => {
  const res = await fetch(`${API_BASE}/profile/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create profile: ${res.statusText}`);
  }

  return res.json(); // Returns { message, token, user }
};

// Get logged-in profile (Protected)
export const getProfileApi = async (): Promise<Profile> => {
  const res = await fetch(`${API_BASE}/profile/get`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.statusText}`);
  }

  return res.json();
};

// Update logged-in profile (Protected)
export const updateProfileApi = async (profile: Profile) => {
  const res = await fetch(`${API_BASE}/profile/update`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profile),
  });

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.statusText}`);
  }

  return res.json();
};
