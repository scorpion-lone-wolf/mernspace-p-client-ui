import { parseSetCookie } from "cookie";
import { cookies } from "next/headers";

export async function POST() {
  const backendUrl = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return Response.json({ success: false, message: "Backend URL is not configured." }, { status: 500 });
  }

  const cookieStore = await cookies();
  const response = await fetch(`${backendUrl}/api/auth/auth/refresh`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookieStore.get("access_token")?.value}`,
      Cookie: `refresh_token=${cookieStore.get("refresh_token")?.value}`,
    },
  });

  if (!response.ok) {
    console.log("Refresh failed!");
    return Response.json({ success: false }, { status: response.status });
  }

  const responseCookies = response.headers.getSetCookie();
  const accessToken = responseCookies.find(setCookie => setCookie.startsWith("access_token="));
  const refreshToken = responseCookies.find(setCookie => setCookie.startsWith("refresh_token="));

  if (!accessToken || !refreshToken) {
    return Response.json(
      { success: false, message: "The auth service did not return refreshed cookies." },
      { status: 502 },
    );
  }

  const parsedAccessToken = parseSetCookie(accessToken);
  const parsedRefreshToken = parseSetCookie(refreshToken);

  cookieStore.set({
    name: parsedAccessToken.name,
    value: parsedAccessToken.value ?? "",
    maxAge: parsedAccessToken.maxAge,
    httpOnly: true,
    path: parsedAccessToken.path ?? "/",
    sameSite: "strict",
  });

  cookieStore.set({
    name: parsedRefreshToken.name,
    value: parsedRefreshToken.value ?? "",
    maxAge: parsedRefreshToken.maxAge,
    httpOnly: true,
    path: parsedRefreshToken.path ?? "/",
    sameSite: "strict",
  });

  return Response.json({ success: true });
}
