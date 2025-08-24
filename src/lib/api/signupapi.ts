// lib/api/signupapi.ts

type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
};

export async function registerUser({
  username,
  email,
  password,
}: RegisterInput): Promise<RegisterResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}
