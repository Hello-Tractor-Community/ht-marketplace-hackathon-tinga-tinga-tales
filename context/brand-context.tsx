"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {getBrands} from "@/app/actions/getBrandsAction";


type BrandContextType = {
    loading: boolean;
    brands: Brand[];
    setBrands: React.Dispatch<React.SetStateAction<Brand[]>>;
};

const BrandsContext = createContext<BrandContextType | undefined>(undefined);

export const BrandsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const fetchedBrands = await getBrands();
                setBrands(fetchedBrands);
            } catch (error) {
                console.error("Error loading Brands:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData().then(() => console.log("Brands loaded"));
    }, []);


    return (
        <BrandsContext.Provider value={{ brands, setBrands, loading }}>
            {children}
        </BrandsContext.Provider>
    );
};

export const useBrandsContext = () => {
    const context = useContext(BrandsContext);
    if (!context) {
        throw new Error("useBrandsContext must be used within a MenuProvider");
    }
    return context;
};