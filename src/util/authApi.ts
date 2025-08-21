import axios from "axios";
import { BASE } from "./BASE_URL";



const URL = `${BASE}/api`;

export async function login(phoneNumber: string) {
  try {
    const response = await axios.post(`${URL}/auth/user/login-with-otp`, {
      phoneNumber,
    });

    if (response.status === 200) {
      console.log("✅ Login response:", response.data);
      return response.data; // Could be token, user data, or OTP
    } else {
      console.warn("⚠️ Unexpected status:", response.status);
      return null;
    }
  } catch (error: any) {
    console.error("❌ Login error:", error.response?.data || error.message);
    return null;
  }
}


export async function verifyOtp(phoneNumber: string, otp: string) {
  try {
    const response = await axios.post(`${URL}/auth/user/login-with-otp/verify-otp`, {
      phoneNumber,
      otp,
    });

    if (response.status === 200) {
      console.log("✅ OTP verification successful:", response.data);
      return response.data; // Could be user data or token
    } else {
      console.warn("⚠️ Unexpected status:", response.status);
      return null;
    }
  } catch (error: any) {
    console.error("❌ OTP verification error:", error.response?.data || error.message);
    return null;
  }
}