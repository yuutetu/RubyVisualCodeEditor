import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const repoFromCI = process.env.GITHUB_REPOSITORY?.split('/')[1];
const repo = process.env.NEXT_PUBLIC_REPO_NAME || repoFromCI || '';
const basePath = isProd && repo ? `/${repo}` : '';
const assetPrefix = isProd && repo ? `/${repo}/` : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix,
};

export default nextConfig;
