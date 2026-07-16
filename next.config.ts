import type { NextConfig } from "next";
import os from "os";

const isProd = process.env.NODE_ENV === 'production';

// Dynamically determine the repository name from GitHub Actions environment, fallback if local
const getRepoName = () => {
  if (!isProd) return '';
  const githubRepo = process.env.GITHUB_REPOSITORY; // format: 'owner/repo'
  if (githubRepo) {
    const repo = githubRepo.split('/')[1];
    // If it's the main user/org page repository, GitHub Pages serves it from root (no basepath subpath)
    if (repo.toLowerCase().endsWith('.github.io')) {
      return '';
    }
    return `/${repo}`;
  }
  return '/Duytv081298'; // Fallback
};

const repoName = getRepoName();

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
