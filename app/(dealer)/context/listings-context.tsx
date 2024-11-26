"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {getListings} from "@/app/(dealer)/actions/listings-actions";



type ListingsContextType = {
    loading: boolean;
    listings: Product[];
    setListings: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [listings, setListings] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const fetchedListings = await getListings();
                setListings(fetchedListings);
            } catch (error) {
                console.error("Error loading Listings:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData().then(() => console.log("Listings loaded"));
    }, []);


    return (
        <ListingsContext.Provider value={{ listings, setListings, loading }}>
            {children}
        </ListingsContext.Provider>
    );
};

export const useListingsContext = () => {
    const context = useContext(ListingsContext);
    if (!context) {
        throw new Error("useListingsContext must be used within a MenuProvider");
    }
    return context;
};