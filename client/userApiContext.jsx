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
});
