/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/projects/:slug',
        destination: '/work/project/:slug',
        permanent: true,
      },
      {
        source: '/ideas',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/ideas/:slug',
        destination: '/work/idea/:slug',
        permanent: true,
      },
      {
        source: '/writing',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/writing/:slug',
        destination: '/work/writing/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
