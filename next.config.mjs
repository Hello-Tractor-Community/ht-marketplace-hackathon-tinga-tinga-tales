/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "s3-us-west-2.amazonaws.com" },
            { protocol: "https", hostname: "ht-mobileassets.s3.amazonaws.com" }
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ["@node-rs/argon2"]
    }
};

export default nextConfig;