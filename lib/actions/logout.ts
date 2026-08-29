"use server";

import { cookies } from "next/headers";

export async function logout() {
  const cookie = await cookies();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookie.get("access_token")?.value}`,
      cookie: `refresh_token=${cookie.get("refresh_token")?.value}`,
    },
  });
  if (!response.ok) {
    console.log("Logout failed", response.status);
    return false;
  }
  cookie.delete("access_token");
  cookie.delete("refresh_token");
  return true;
}
