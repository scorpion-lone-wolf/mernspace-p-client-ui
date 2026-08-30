"use client";

import * as jose from "jose";
import { useEffect, type ReactNode } from "react";

const Refresher = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    async function getAccessToken() {
      const res = await fetch("/api/auth/accessToken");
      if (!res.ok) return;

      const accessToken = await res.json();
      return accessToken.token as string | undefined;
    }

    async function refreshAccessToken() {
      try {
        const res = await fetch("/api/auth/refresh", { method: "POST" });

        if (!res.ok) {
          console.log("Failed to refresh access token");
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error while refreshing the token", error);
        return false;
      }
    }

    async function startRefresh() {
      if (timeoutId) clearTimeout(timeoutId);

      try {
        const accessToken = await getAccessToken();
        if (!accessToken || cancelled) return;

        const exp = jose.decodeJwt(accessToken).exp;
        if (!exp) return;

        const currentTime = Date.now();
        const refreshTime = Math.max(exp * 1000 - currentTime - 5000, 0);

        console.log(`Current time: ${new Date(currentTime).toISOString()}`);
        console.log(`Token expiry time: ${new Date(exp * 1000).toISOString()}`);
        console.log(`Scheduled refresh time: ${new Date(currentTime + refreshTime).toISOString()}`);

        timeoutId = setTimeout(async () => {
          if (cancelled) return;

          console.log("Access token is refreshing...");
          const refreshed = await refreshAccessToken();

          if (refreshed && !cancelled) {
            await startRefresh();
          }
        }, refreshTime);
      } catch (error) {
        console.error("Error while scheduling token refresh", error);
      }
    }

    void startRefresh();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return <div>{children}</div>;
};

export default Refresher;
