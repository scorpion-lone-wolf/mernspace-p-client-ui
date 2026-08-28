"use server";
import { parseSetCookie } from "cookie";
import { cookies } from "next/headers";

type LoginState = {
  type: string;
  message: string;
};

export default async function login(_prevState: LoginState, formdata: FormData) {
  const email = formdata.get("email");
  const password = formdata.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      type: "error",
      message: "Email and password are required.",
    };
  }

  const backendUrl = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    return {
      type: "error",
      message: "Backend URL is not configured.",
    };
  }

  try {
    const response = await fetch(`${backendUrl}/api/auth/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return {
        type: "error",
        message: error?.errors?.[0]?.message ?? `Unable to log in (${response.status}).`,
      };
    }

    const responseCookies = response.headers.getSetCookie();
    const accessToken = responseCookies.find(setCookie => setCookie.startsWith("access_token="));
    const refreshToken = responseCookies.find(setCookie => setCookie.startsWith("refresh_token="));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No cookies were found!",
      };
    }

    const parsedAccessToken = parseSetCookie(accessToken);
    const parsedRefreshToken = parseSetCookie(refreshToken);
    const cookieStore = await cookies();

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

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (error) {
    return {
      type: "error",
      message: error instanceof Error ? error.message : "Unable to log in.",
    };
  }
}
