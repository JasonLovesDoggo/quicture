/** @type {import('next').NextConfig} */
const nextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: 'www.googleapis.com'}]}};

export default nextConfig;
