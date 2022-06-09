import React from "react";
import { fetchJSON } from "../components/fetchJSON";

export const MainPageApiContext = React.createContext({
  async showCourse(course) {
    return await fetchJSON("/api/course?" + new URLSearchParams(course));
  },
  async showPlannedSession(sessionId) {
    return await fetchJSON(
      "/api/session/planned-session?" + new URLSearchParams(sessionId)
    );
  },
  async showFinishedSession(sessionId) {
    return await fetchJSON(
      "/api/session/finished-session?" + new URLSearchParams(sessionId)
    );
  },
  async showActiveSession(sessionId) {
    return await fetchJSON(
      "/api/session/active-session?" + new URLSearchParams(sessionId)
    );
  },
  /*async endPlannedSession() {
        const res = await fetch("/api/session/planned-session", {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
        }
      },*/
  async getPlannedOrActiveSession(sessionId) {
    return await fetchJSON(
      "/api/session/new-session?" + new URLSearchParams(sessionId)
    );
  },
});
