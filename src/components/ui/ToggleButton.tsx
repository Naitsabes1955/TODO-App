"use client";

import {
  Moon,
  Sun,
} from "@gravity-ui/icons";
import {Switch} from "@heroui/react";
import '@/styles/pages/home.css'
import { useEffect, useState } from "react";


export function WithIcons() {
    const [isDark, setIsDark] = useState(false)
  const icons = {
    darkMode: {
      off: Moon,
      on: Sun,
      selectedControlClass: "",
    }
  };
  useEffect(() => {
    const root = document.documentElement;
    if(isDark) {
        root.classList.add("dark-mode");
        root.classList.remove("light-mode");
    } else {
        root.classList.add("light-mode");
        root.classList.remove("dark-mode");
    }
    }, [isDark]);
  
  return (
    <div className="flex gap-3 ">
      {Object.entries(icons).map(([key, value]) => (
        <Switch key={key} size="lg" isSelected={isDark} onChange={setIsDark}>
          {({isSelected}) => (
            <>
              <Switch.Control className={isSelected ? value.selectedControlClass : ""}>
                <Switch.Thumb>
                  <Switch.Icon>
                    {isSelected ? (
                      <value.on className="size-3 text-inherit opacity-100" />
                    ) : (
                      <value.off className=" size-3 text-inherit opacity-70" />
                    )}
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </>
          )}
        </Switch>
      ))}
    </div>
  );
}