import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wdmsqswrjzkmfuuyemfs.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "platobackendblob.blob.core.windows.net",
        pathname: "/**",
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);
