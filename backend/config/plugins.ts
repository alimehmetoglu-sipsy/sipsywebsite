export default ({ env }) => {
  const isProduction = env('NODE_ENV') === 'production';

  return {
    i18n: {
      enabled: true,
      config: {
        defaultLocale: 'tr',
        locales: ['tr', 'en'],
      },
    },
    upload: isProduction ? {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          baseUrl: env('CDN_URL', `https://${env('AWS_BUCKET')}.s3.${env('AWS_REGION')}.amazonaws.com`),
          s3Options: {
            credentials: {
              accessKeyId: env('AWS_ACCESS_KEY_ID'),
              secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
            },
            region: env('AWS_REGION'),
            params: {
              signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
              Bucket: env('AWS_BUCKET'),
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    } : {
      // Local development - use local storage
      config: {
        sizeLimit: 250 * 1024 * 1024, // 250mb
      },
    },
  };
};
