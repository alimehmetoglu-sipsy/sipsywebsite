/**
 * solution controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::solution.solution', ({ strapi }) => ({
  async find(ctx) {
    // Populate nested components properly
    ctx.query = {
      ...ctx.query,
      populate: {
        service: true,
        tools: true,
        visuals: true,
        project: {
          populate: {
            problemPoints: true,
            solutionSteps: true,
            results: true,
            beforeMetrics: true,
            afterMetrics: true
          }
        }
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    // Populate nested components properly
    ctx.query = {
      ...ctx.query,
      populate: {
        service: true,
        tools: true,
        visuals: true,
        project: {
          populate: {
            problemPoints: true,
            solutionSteps: true,
            results: true,
            beforeMetrics: true,
            afterMetrics: true
          }
        }
      },
    };

    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));
