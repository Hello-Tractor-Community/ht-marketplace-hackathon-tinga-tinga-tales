'use client'

import React, { createContext, useContext, useState } from 'react';
import {clearWishlistAction, removeFromWishlistAction} from '@/app/actions/wishlist/wishlist';

interface WishlistContextProps {
    products: Product[] | null;
    removeProduct: (productId: string) => void;
    clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

export const WishlistProvider = ({ products: initialProducts, children }: { products: Product[] | null, children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[] | null>(initialProducts);

    const removeProduct = async (productId: string) => {
        await removeFromWishlistAction(productId);
        setProducts(products?.filter(product => product.id !== productId) || null);
    };

    const clearWishlist = async () => {
        await clearWishlistAction();
        setProducts(null);
    }


    return (
        <WishlistContext.Provider value={{ products, removeProduct, clearWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlistContext must be used within a WishlistProvider');
    }
    return context;
};