const API_URL = "https://st51mzlz-8080.inc1.devtunnels.ms/api/users/get-all-services" // Replace if needed

export async function fetchServices({
  page = 1,
  limit = 20,
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

    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (popular !== undefined) params.append("popular", popular.toString());
    if (category) params.append("category", category);
    if (isActive !== undefined) params.append("isActive", isActive.toString());

    const finalURL = `${API_URL}?${params.toString()}`;
    console.log("🌐 URL:", finalURL);

    const response = await fetch(finalURL, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const rawText = await response.text();
    console.log("📦 Raw response text:", rawText);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}: ${rawText}`);
    }

    // Try parsing only if there's content
    if (!rawText || rawText.trim() === "") {
      throw new Error("Empty response received from server.");
    }

    const data = JSON.parse(rawText);
    console.log("✅ Fetched services:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching services:", error.message || error);
    throw new Error(error.message || "Unexpected error fetching services.");
  }
}
