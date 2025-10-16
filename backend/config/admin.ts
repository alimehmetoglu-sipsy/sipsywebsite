export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  url: env('ADMIN_URL', '/admin'),
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  // Session configuration - supports both HTTP (dev) and HTTPS (prod)
  session: {
    cookie: {
      secure: env.bool('ADMIN_COOKIE_SECURE', env('NODE_ENV') === 'production' && env('IS_PROXIED') === 'true'),
      httpOnly: true,
      maxAge: 86400000, // 1 day
      sameSite: 'lax',
    },
  },
});
