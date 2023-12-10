/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["visckezfpxkplebcmuzh.supabase.co"],
    },
};

module.exports = nextConfig;
