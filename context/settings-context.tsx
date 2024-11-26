"use client";

import React, { createContext, useContext, useState } from "react";

type SettingSettingMenuContextType = {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
};

const SettingMenuContext = createContext<SettingSettingMenuContextType | undefined>(undefined);

export const SettingMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState("Profile");

    return (
        <SettingMenuContext.Provider value={{ selectedMenu, setSelectedMenu }}>
            {children}
        </SettingMenuContext.Provider>
    );
};

export const useSettingMenuContext = () => {
    const context = useContext(SettingMenuContext);
    if (!context) {
        throw new Error("useSettingMenuContext must be used within a MenuProvider");
    }
    return context;
};
