/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // When hosted via GitHub Pages from a *project repo* (mitchuski/soulbis),
  // the site is served at https://mitchuski.github.io/soulbis/.
  // For a custom domain, GitHub serves at /, so these are disabled.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
