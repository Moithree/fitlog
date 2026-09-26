/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' }, // সব ওয়েবসাইটের ছবি অ্যালাউ করার জন্য
    ],
  },
};

export default nextConfig;