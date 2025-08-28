import axios from "axios";
import { BASE } from "./BASE_URL";
import { UserProfile } from "../constants/types";

interface UserProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

const URL = `${BASE}/api`;

export const updateProfile = async (
  token: string,
  profileData: UserProfileData
): Promise<UserProfileData> => {
  try {
    const res = await axios.put(
      `${URL}/users/update-user`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Profile updated:", res.data);
    console.log("Profile updated returnnn:", res.data.updatedUser);
    return res.data.updatedUser;
  } catch (error: any) {
    
    console.error(error.response?.data || error.message);
    throw error;
  }
};
