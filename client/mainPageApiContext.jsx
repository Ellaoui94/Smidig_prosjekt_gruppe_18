import React from "react";
import { fetchJSON } from "./fetchJSON";
import { postJSON } from "./postJSON";

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
  async addNewTodo(todos, sessionId) {
    console.log("inside api: " + JSON.stringify(todos));
    return await postJSON(
      "/api/session/new-todo?" + new URLSearchParams(sessionId),
      todos
    );
  },
});
