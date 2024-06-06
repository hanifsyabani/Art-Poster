/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        hostname: 'encrypted-tbn0.gstatic.com'
      },
      {
        hostname: 'nextui.org'
      }
    ]
  }
};

export default nextConfig;
