"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* ThemeSwitch 🌜🌞*/}
      <Button
        className="bg-transparent border h-8 w-8 flex justify-center items-center rounded-full shadow-lg"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >{`${theme === "light" ? "🌜" : "🌞"}`}</Button>
    </div>
  );
};

// export default ThemeSwitch;
