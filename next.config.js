module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cloudinary.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  staticPageGenerationTimeout: 1000,
  useFileSystemPublicRoutes: false,
};
