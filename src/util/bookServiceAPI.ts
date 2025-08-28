import axios from "axios";
import { BASE } from "./BASE_URL";



const URL = `${BASE}/api`;

export async function bookService(serviceName: string, formData: FormData) {
  
  try{
    const response = await axios.post(
    "www.backendServer.com",
    {
      serviceName,
      formData,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
   console.log("Upload successful:", response.data);
} catch (err){
    console.log(err);
    
}
}


export async function bookServiceAPI(token: string) {
  const url = `${URL}/users/book-service`;

  const payload = {
    serviceId: "662f5c8320babc1234567890",
    address: {
      street: "123 Lane",
      city: "Mumbai",
      state: "Maharashtra",
      zipcode: "140802",
      coordinates: { lat: 19.076, lon: 72.8777 },
    },
    zipcode: "140802",
    scheduledDate: "2025-07-25T14:00:00Z", // ✅ exactly this format
    notes: "Please send someone with AC gas refill experience.",
  };

   console.log("📡 Sending POST request to:", url);
  console.log("🔐 Authorization Token:", token);
  console.log("📦 Request Headers:", {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  console.log("📝 Request Payload:", payload);


  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ✅ token header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // ✅ exact body structure
    });

    const text = await response.text();

    if (!response.ok) {
      let errorMessage = "Failed to book service";
      try {
        const errorData = text ? JSON.parse(text) : null;
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        // Fallback if not JSON
      }
      throw new Error(errorMessage);
    }

    const result = text ? JSON.parse(text) : {};
    console.log("✅ Service booked successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ API error:", error);
    throw error;
  }
}



export const fetchMyBookedServices = async (token: string) => {
  const response = await axios.get(`${URL}/users/my-booked-services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log("++++++responcexxx : ", response);
  
  return response.data;
};


export const fetchMyHistory = async (token: string) => {
  const response = await axios.get(`${URL}/users/my-history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("++++++responcexxx : ", response);
  
  return response.data;
};