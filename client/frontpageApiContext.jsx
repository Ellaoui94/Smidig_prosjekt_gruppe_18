import React from "react";
import { fetchJSON } from "./fetchJSON";

export const FrontpageApiContext = React.createContext({
  async showCourse(course) {
    return await fetchJSON("/api/course?" + new URLSearchParams(course));
  },
});
