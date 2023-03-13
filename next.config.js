const nextConfig = {
  reactStrictMode: false,
  // swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  distDir: 'build',
  images: {
    domains: ['files.stripe.com', 'splitflap.com'],
  },
}

module.exports = nextConfig;
