// https://tailwindcomponents.com/component/radio-buttons-1
"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TabBarProps {
  tabOptions?: number[];
  currentTab?: number;
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: TabBarProps) => {
  const [selected, setSelected] = useState(currentTab);
  const router = useRouter();

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    // este solo se puede del lado del cliente
    setCookie('selectedTab', tab.toString())
    router.refresh();
  };

  return (
    <div
      className="grid w-full space-x-2 rounded-xl bg-gray-200 p-2"
      style={{ gridTemplateColumns: `repeat(${tabOptions.length}, 1fr)` }}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={tab === selected}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
