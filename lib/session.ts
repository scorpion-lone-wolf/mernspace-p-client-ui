import { cookies } from "next/headers";

type User = {
  id: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "CUSTOMER";
  firstName: string;
  lastName: string;
  tenantId: string | null;
};

export const getSession = async () => {
  return await getMe();
};
const getMe = async () => {
  const cookieStore = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/me`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
    },
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();

  return {
    user: data.data[0] as User,
  };
};
