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

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  message: string;
};

function extractErrorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail: unknown }).detail;
    if (typeof detail === "string") {
      return detail;
    }
    if (Array.isArray(detail)) {
      const messages = detail
        .map((item) => (item && typeof item === "object" && "msg" in item ? String((item as { msg: unknown }).msg) : null))
        .filter((msg): msg is string => Boolean(msg));
      if (messages.length > 0) {
        return messages.join(" ");
      }
    }
  }
  if (data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string") {
    return (data as { message: string }).message;
  }
  return fallback;
}

export async function submitContact(payload: ContactPayload) {
  let response: Response;
  try {
    response = await fetch(`${getApiBaseUrl()}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone ?? "",
        organization: payload.organization ?? "",
        message: payload.message
      })
    });
  } catch {
    throw new Error("Unable to reach the server. Please check your connection and try again.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(extractErrorMessage(data, "Unable to submit your message. Please try again."));
  }

  return data as { success: boolean; message: string };
}

export async function fetchCapabilityInsights() {
  return [];
}

export async function fetchCapabilityMap() {
  return [];
}
