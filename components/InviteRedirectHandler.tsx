"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InviteRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    // Check if URL has invitation tokens in hash
    if (typeof window !== "undefined" && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get("type");

      if (type === "invite") {
        // Redirect to set-password page with the hash intact
        router.replace(`/set-password${window.location.hash}`);
      }
    }
  }, [router]);

  return null;
}
