import { Route, Routes, useLocation } from "react-router-dom";
import PageOne from "./pageOne";
import PageTwo from "./pageTwo";
import PageThree from "./pageThree";
import { AnimatePresence } from "framer-motion";

export default function AnimatedRoutes({ setRegistered }) {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path={"/introOne"}
          element={<PageOne setRegistered={setRegistered} />}
        />
        <Route
          path={"/introTwo"}
          element={<PageTwo setRegistered={setRegistered} />}
        />
        <Route
          path={"/introThree"}
          element={<PageThree setRegistered={setRegistered} />}
        />
      </Routes>
    </AnimatePresence>
  );
}
