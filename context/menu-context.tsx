"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type MenuContextType = {
    selectedMenu: string;
    setSelectedMenu: (menu: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedMenu, setSelectedMenu] = useState("Dashboard");

    useEffect(() => {
        const savedMenu = localStorage.getItem("selectedMenu");
        if (savedMenu) {
            setSelectedMenu(savedMenu);
        }
    }, []);

    const handleSetSelectedMenu = (menu: string) => {
        setSelectedMenu(menu);
        localStorage.setItem("selectedMenu", menu);
    };

    return (
        <MenuContext.Provider value={{ selectedMenu, setSelectedMenu: handleSetSelectedMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenuContext must be used within a MenuProvider");
    }
    return context;
};