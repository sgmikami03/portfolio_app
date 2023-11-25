/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["ihkfopvgacbereyxvlyp.supabase.co"],
    },
};

module.exports = nextConfig;
