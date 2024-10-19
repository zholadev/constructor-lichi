/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['static.lichi.com', 'https://static.lichi.com/', 'https://static.lichi.com', 'cdn3.lichi.com', 'https://images.unsplash.com', 'images.unsplash.com']
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
