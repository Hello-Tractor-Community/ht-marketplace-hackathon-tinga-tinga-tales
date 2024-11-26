import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "s3-us-west-2.amazonaws.com" },
            { protocol: "https", hostname: "ht-mobileassets.s3.amazonaws.com" }
        ],
    },
};

export default nextConfig;