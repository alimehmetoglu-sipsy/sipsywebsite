export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  {
    name: 'strapi::session',
    config: {
      rolling: true,
      renew: true,
      cookie: {
        secure: false, // nginx handles SSL, not Strapi
        httpOnly: true,
        maxAge: 86400000, // 1 day
        sameSite: 'lax',
        overwrite: true,
      },
    },
  },
  'strapi::favicon',
  'strapi::public',
];
