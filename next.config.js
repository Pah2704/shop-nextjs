/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true // Bỏ qua kiểm tra ESLint khi build
  }
}

module.exports = nextConfig
