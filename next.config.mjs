/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/passwordGenerator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
