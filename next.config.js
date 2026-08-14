/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Static HTML export — perfect for Cloudflare Pages
  trailingSlash: true,   // Cloudflare Pages prefers /page/ over /page
  images: {
    unoptimized: true,   // Required for static export (no server to optimize)
  },
};

module.exports = nextConfig;
