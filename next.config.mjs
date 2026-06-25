/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for hosting on Render as a static site.
  output: "export",
  // Required for static export: disables the Image Optimization API.
  // We ship pre-optimized WebP assets instead.
  images: {
    unoptimized: true,
  },
  // Emit /about/ instead of /about.html so static hosts resolve routes cleanly.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
