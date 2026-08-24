/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,   // ข้าม Warning ตอน Build
  },
  typescript: {
    ignoreBuildErrors: true,    // เผื่อใช้ TypeScript แล้วมี Error
  },
}

module.exports = nextConfig
