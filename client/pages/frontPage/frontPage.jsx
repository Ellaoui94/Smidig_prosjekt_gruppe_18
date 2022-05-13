import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { NewProfile } from "../registerUserPage/newProfile";
import { LoginPage } from "../loginPage/loginPage";

export function FrontPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/register"} element={<NewProfile />} />
        <Route path={"/login/*"} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
