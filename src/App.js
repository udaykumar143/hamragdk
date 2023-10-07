import React from "react";
import {
  CreateContainer,
  Gallery,
  Header,
  MainContainer,
  Aboutus,
  Shopping,
} from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <div className="w=-screen h-auto flex flex-col">
        <Header />
        <main className=" mt-14 md:mt-20  p-8 w-full ">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/CreateContainer" element={<CreateContainer />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/Aboutus" element={<Aboutus />} />
            <Route path="/Shopping" element={<Shopping />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
