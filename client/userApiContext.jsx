import { fetchJSON } from "./fetchJSON";
import React from "react";

export const UserApiContext = React.createContext({
  async listUser(query) {
    return await fetchJSON("/api/user?" + new URLSearchParams(query));
  },
});
