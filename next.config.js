/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true // Bỏ qua kiểm tra ESLint khi build
  }
}

module.exports = nextConfig
