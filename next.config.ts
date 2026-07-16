import type { NextConfig } from "next";
import os from "os";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/Duytv081298'; // The repository name on GitHub

// Dynamically allow development access from local network IPs
const devOrigins = ['localhost', 'localhost:3000', '127.0.0.1'];
if (!isProd) {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
      if (net.family === 'IPv4' && !net.internal) {
        devOrigins.push(net.address);
        devOrigins.push(`${net.address}:3000`);
        devOrigins.push(`${net.address}:3001`);
      }
    }
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? repoName : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoName : '',
  },
  allowedDevOrigins: devOrigins,
};

export default nextConfig;
