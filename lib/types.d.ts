declare global {
    type UserRole = 'ADMIN' | 'CUSTOMER' | 'SELLER' | 'DEALER' | 'OPERATOR';
    type UserStatus = 'Unapproved' | 'Pending' | 'Approved' | 'Banned';
    type User = {
        id: string;
        google_id?: string | undefined | null;
        image?: string | undefined | null;
        name: string;
        email: string;
        role: UserRole;
        phone?: string | undefined | null;
        status: UserStatus;
        dealer?: Dealer | null;
        seller?: Seller | null;
        operator?: Operator | null;
    };

    type Dealer = {
        business_permit_image: string;
        description: string;
        location: string;
    };

    type Seller = {
        description: string;
        location: string;
    };

    type Operator = {
        description: string;
        location: string;
        rate_card: number;
        experience: OperatorExperienceType;
        certifications: OperatorCertification[];
    };

    type OperatorCertification = {
        name: string;
        certification_image: string;
    };

    type ProductStatus = 'unapproved' | 'approved' | 'archived';



    type Product = {
        id: string;
        name: string;
        owner_id?: string | undefined | null;
        owner?: User | null;
        status: ProductStatus;
        description: string;
        quantity_in_stock?: number | undefined | null;
        location: string;
        price: number;
        model: string;
        used_time: string | undefined | null;
        year: string | undefined | null;
        history: string | undefined | null;
        brand: Brand;
        product_images: ProductImage[];
        category?: Category | undefined | null;
        sub_category?: SubCategory | undefined | null;
    };

    // type Wishlist = {
    //     id: string;
    //     user_id: string;
    //     products: {
    //         product: Product;
    //     }[];
    // };

    type Wishlist = {
        id: string;
        user_id: string;
       products: {
              product: Product;
       }[];
    };

    type ProductImage = {
        id: string;
        image: string;
        product_id: string;
    };

    type Brand = {
        name: string;
        logo: string;
    };

    type Category = {
        name: string;
        description: string;
        sub_categories: SubCategory[] | undefined | null;
    };

    type SubCategory = {
        name: string;
        description: string;
        _count: {
            products: number;
        };
    };
}

export {};