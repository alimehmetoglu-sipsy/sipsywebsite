/**
 * service controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::service.service', ({ strapi }) => ({
  async find(ctx) {
    // Populate nested components properly
    ctx.query = {
      ...ctx.query,
      populate: {
        solutions: {
          populate: {
            service: true,
            project: true,
            keyTools: {
              populate: {
                Logo: true
              }
            }
          }
        },
        keyTools: {
          populate: {
            Logo: true
          }
        }
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
