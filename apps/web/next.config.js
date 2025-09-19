/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/py/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/py/:path*"
            : "/api/",
      },
      {
        source: "/api/getToken/:username/:roomId",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/getToken/:username/:roomId"
            : "/api/getToken/:username/:roomId",
      },
      {
        // Proxy token requests with a username parameter to the FastAPI backend.
        // Example: /api/getToken/alice -> http://127.0.0.1:8000/api/getToken/alice (dev)
        source: "/api/getAgentToken/:roomId",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/getAgentToken/:roomId"
            : "/api/getAgentToken/:roomId",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/py/docs"
            : "/api/py/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/py/openapi.json"
            : "/api/py/openapi.json",
      },
    ];
  },
};

export default nextConfig;
