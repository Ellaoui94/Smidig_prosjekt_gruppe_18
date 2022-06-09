import { fetchJSON } from "../components/fetchJSON";
import React from "react";

export const UserApiContext = React.createContext({
  async listUser(query) {
    return await fetchJSON("/api/user?" + new URLSearchParams(query));
  },
  async listSubjects(query) {
    return await fetchJSON("/api/map?" + new URLSearchParams(query));
  },
  async endSession() {
    const res = await fetch("/api/auth", { method: "DELETE" });
    if (!res.ok) {
      throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
  },
  async createSession(session) {
    return await postJSON("/api/session?", session);
  },
});

export async function postJSON(url, object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}
