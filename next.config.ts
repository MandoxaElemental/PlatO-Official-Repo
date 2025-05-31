import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['platobackendblob.blob.core.windows.net'],
  },
};

export default withFlowbiteReact(nextConfig);