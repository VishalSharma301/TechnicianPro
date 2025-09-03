import axios, { AxiosError } from "axios";
import { BASE } from "./BASE_URL";



const URL = `${BASE}/api`;

// Define expected error response from backend
type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export async function login(phoneNumber: string) {
  try {
    const response = await axios.post(`${URL}/auth/user/login-with-otp`, {
      phoneNumber,
    });

    if (response.status === 200) {
      console.log("✅ Login response:", response.data);
      return response.data; // token, user data, or OTP
    } else {
      console.warn("⚠️ Unexpected status:", response.status);
      return null;
    }
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    console.error(
      "❌ Login error:",
      data?.message || axiosError.message || "Unknown error"
    );

    if (status) {
      console.error("HTTP Status:", status);
    }

    return null;
  }
}

// 🔑 VERIFY OTP
export async function verifyOtp(phoneNumber: string, otp: string) {
  try {
    const response = await axios.post(
      `${URL}/auth/user/login-with-otp/verify-otp`,
      {
        phoneNumber,
        otp,
      }
    );

    if (response.status === 200) {
      console.log("✅ OTP verification successful:", response.data);
      return response.data; // user data or token
    } else {
      console.warn("⚠️ Unexpected status:", response.status);
      return null;
    }
  } catch (err) {
    const axiosError = err as AxiosError<ApiErrorResponse>;
    const status = axiosError.response?.status;
    const data = axiosError.response?.data;

    console.error(
      "❌ OTP verification error:",
      data?.message || axiosError.message || "Unknown error"
    );

    if (status) {
      console.error("HTTP Status:", status);
    }

    return null;
  }
}