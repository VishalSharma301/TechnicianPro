import { BASE } from "./BASE_URL";



const API_URL = `${BASE}/api/users/get-all-services` 

export async function fetchServices({
  page = 1,
  limit = 100,
  popular,
  category,
  isActive,
}: {
  page?: number;
  limit?: number;
  popular?: boolean;
  category?: string;
  isActive?: boolean;
}) {
  try {
    console.log("📡 Fetching services...");

    // 1. Build query params safely
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (popular !== undefined) params.append("popular", String(popular));
    if (category) params.append("category", category);
    if (isActive !== undefined) params.append("isActive", String(isActive));

    const finalURL = `${API_URL}?${params.toString()}`;
    console.log("🌐 URL:", finalURL);

    // 2. Call API
    const response = await fetch(finalURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).catch((err) => {
      // Network / fetch failed completely
      throw new Error(`Network request failed: ${err.message}`);
    });

    // 3. Read raw text
    const rawText = await response.text();
    // console.log("📦 Raw response text:", rawText);

    // 4. Handle HTTP status errors
    if (!response.ok) {
      throw new Error(
        `❌ Server responded with status ${response.status} (${response.statusText}): ${rawText}`
      );
    }

    if (!rawText || rawText.trim() === "") {
      throw new Error("❌ Empty response received from server.");
    }

    // 5. Parse JSON safely
    let data: any;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      throw new Error(`❌ Failed to parse JSON: ${(err as Error).message}`);
    }

    // 6. Validate expected structure
    if (!data || typeof data !== "object") {
      throw new Error("❌ Invalid response structure: Root is not an object.");
    }

    if (!Array.isArray(data.services)) {
      throw new Error("❌ Invalid response: 'services' key missing or not an array.");
    }

    console.log("✅ Fetched services:", data.services.length);
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching services:", error.message || error);
    throw new Error(error.message || "Unexpected error fetching services.");
  }
}
