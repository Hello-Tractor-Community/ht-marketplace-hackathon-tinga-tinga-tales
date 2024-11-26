"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {getCategories} from "@/app/actions/getCategoriesAction";


type CategoriesContextType = {
    loading: boolean;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error loading Categories:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData().then(() => console.log("Categories loaded"));
    }, []);


    return (
        <CategoriesContext.Provider value={{ categories, setCategories, loading }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategoriesContext = () => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error("useCategoriesContext must be used within a MenuProvider");
    }
    return context;
};