import { fetchJSON } from "./fetchJSON";
import React from "react";

export const UserApiContext = React.createContext({
  async listUser(query) {
    return await fetchJSON("/api/user?" + new URLSearchParams(query));
  },
  async endSession() {
    const res = await fetch("/api/auth", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
