import { fetchJSON } from "./fetchJSON";
import React from "react";
import { postJSON } from "./postJSON";

export const UserApiContext = React.createContext({
  async listUser(query) {
    return await fetchJSON("/api/user?" + new URLSearchParams(query));
  },

  async creatUser(user) {
    return await postJSON("/api/user", user);
  },

  async deleteUser() {
    const res = await fetch("/api/user", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
});
