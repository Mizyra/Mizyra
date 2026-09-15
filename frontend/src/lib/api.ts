const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const API_BASE_URL =
  configuredApiUrl?.replace(/\/+$/, "") ??
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : null);

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured. Set it to the deployed backend URL and redeploy the frontend."
    );
  }

  return API_BASE_URL;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export async function loginStudent(payload: LoginPayload) {
  const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  return response.json();
}

export async function submitApplication(formData: FormData) {
  const response = await fetch(`${getApiBaseUrl()}/applications`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  return response.json();
}

export async function fetchCapabilityInsights() {
  return [];
}

export async function fetchCapabilityMap() {
  return [];
}
