/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    domains:['s.gravatar.com', 'res.cloudinary.com']
  }
}

module.exports = nextConfig
