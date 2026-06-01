/** @type {import('next').NextConfig} */

/**
 * CSP aligned with Google Tag Platform guidance (GTM, GA4, Ads endpoints) plus
 * app third-parties (Supabase, YouTube embed, Google Maps embed, Next/font).
 * @see https://developers.google.com/tag-platform/security/guides/csp
 */
function buildContentSecurityPolicy() {
  const supabaseOrigins = (() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!url) return [];
    try {
      const { protocol, host } = new URL(url);
      const httpOrigin = `${protocol}//${host}`;
      const wsOrigin = `${protocol === "https:" ? "wss" : "ws"}://${host}`;
      return [httpOrigin, wsOrigin];
    } catch {
      return [];
    }
  })();

  const directives = {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "object-src": ["'none'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://*.googletagmanager.com",
      "https://www.googletagmanager.com",
      "https://googletagmanager.com",
      "https://tagmanager.google.com",
      "https://www.google.com",
      "https://www.gstatic.com",
      "https://www.googleadservices.com",
      "https://pagead2.googlesyndication.com",
      "https://googleads.g.doubleclick.net",
      "https://www.youtube.com",
      "https://www.youtube-nocookie.com",
      "https://maps.googleapis.com",
      "https://cdn.jsdelivr.net",
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://*.googletagmanager.com",
      "https://www.googletagmanager.com",
      "https://googletagmanager.com",
      "https://tagmanager.google.com",
      "https://cdn.jsdelivr.net",
    ],
    "font-src": ["'self'", "https://fonts.gstatic.com", "data:"],
    "img-src": [
      "'self'",
      "data:",
      "blob:",
      "https://*.google-analytics.com",
      "https://analytics.google.com",
      "https://*.googletagmanager.com",
      "https://*.g.doubleclick.net",
      "https://www.google.com",
      "https://google.com",
      "https://www.google.com.br",
      "https://google.com.br",
      "https://ssl.gstatic.com",
      "https://www.gstatic.com",
      "https://maps.gstatic.com",
      "https://fonts.gstatic.com",
      "https://maps.googleapis.com",
      "https://i.ytimg.com",
      "https://*.ytimg.com",
    ],
    "connect-src": [
      "'self'",
      "https://*.google-analytics.com",
      "https://*.analytics.google.com",
      "https://analytics.google.com",
      "https://*.googletagmanager.com",
      "https://*.g.doubleclick.net",
      "https://pagead2.googlesyndication.com",
      "https://www.google.com",
      "https://google.com",
      "https://www.google.com.br",
      "https://google.com.br",
      "https://www.googleadservices.com",
      "https://googleads.g.doubleclick.net",
      "https://ad.doubleclick.net",
      "https://vitals.vercel-insights.com",
      ...supabaseOrigins,
    ],
    "frame-src": [
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google.com",
      "https://www.youtube.com",
      "https://www.youtube-nocookie.com",
    ],
    "worker-src": ["'self'", "blob:"],
  };

  return Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
}

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildContentSecurityPolicy(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
