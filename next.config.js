/** @type {import('next').NextConfig} */
const nextConfig = {
  // Stop Next.js auto-generating AGENTS.md / CLAUDE.md in the project root.
  agentRules: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
