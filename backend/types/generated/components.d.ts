import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsContentCard extends Struct.ComponentSchema {
  collectionName: 'components_about_us_content_cards';
  info: {
    description: 'Individual card for about us sections (expertise, achievements, etc.)';
    displayName: 'Content Card';
    icon: 'layer';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface AboutUsContentSection extends Struct.ComponentSchema {
  collectionName: 'components_about_us_content_sections';
  info: {
    description: 'Section with either text content or card list';
    displayName: 'Content Section';
    icon: 'dashboard';
  };
  attributes: {
    cards: Schema.Attribute.Component<'about-us.content-card', true>;
    description: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sectionTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    sectionType: Schema.Attribute.Enumeration<['text', 'cards', 'badges']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface AboutUsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_about_us_hero_sections';
  info: {
    description: 'Hero section with title, subtitle, badge and stats';
    displayName: 'Hero Section';
    icon: 'star';
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    stats: Schema.Attribute.Component<'about-us.stat-card', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface AboutUsStatCard extends Struct.ComponentSchema {
  collectionName: 'components_about_us_stat_cards';
  info: {
    description: 'Statistics card for hero section (6+, 25+, etc.)';
    displayName: 'Stat Card';
    icon: 'chartBubble';
  };
  attributes: {
    icon: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionMetric extends Struct.ComponentSchema {
  collectionName: 'components_solution_metrics';
  info: {
    description: 'Before/After metric comparison';
    displayName: 'Metric';
    icon: 'dashboard';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionPoint extends Struct.ComponentSchema {
  collectionName: 'components_solution_points';
  info: {
    description: 'Problem or solution point with optional emoji';
    displayName: 'Point';
    icon: 'bulletList';
  };
  attributes: {
    emoji: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SolutionProject extends Struct.ComponentSchema {
  collectionName: 'components_solution_projects';
  info: {
    description: 'Complete project case study details';
    displayName: 'Project';
    icon: 'briefcase';
  };
  attributes: {
    afterMetrics: Schema.Attribute.Component<'solution.metric', true>;
    beforeMetrics: Schema.Attribute.Component<'solution.metric', true>;
    clientInfo: Schema.Attribute.String;
    problemDescription: Schema.Attribute.RichText;
    problemPoints: Schema.Attribute.Component<'solution.point', true>;
    problemTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Problem:'>;
    projectName: Schema.Attribute.String & Schema.Attribute.Required;
    results: Schema.Attribute.Component<'solution.result', true>;
    resultsTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sonu\u00E7:'>;
    solutionDescription: Schema.Attribute.RichText;
    solutionSteps: Schema.Attribute.Component<'solution.point', true>;
    solutionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00C7\u00F6z\u00FCm:'>;
  };
}

export interface SolutionResult extends Struct.ComponentSchema {
  collectionName: 'components_solution_results';
  info: {
    description: 'Result metric with value';
    displayName: 'Result';
    icon: 'chartLine';
  };
  attributes: {
    emoji: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 10;
      }>;
    metric: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionTool extends Struct.ComponentSchema {
  collectionName: 'components_solution_tools';
  info: {
    description: 'Technology or tool used in the solution';
    displayName: 'Tool';
    icon: 'wrench';
  };
  attributes: {
    description: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SolutionVisual extends Struct.ComponentSchema {
  collectionName: 'components_solution_visuals';
  info: {
    description: 'Visual material suggestion';
    displayName: 'Visual';
    icon: 'picture';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-us.content-card': AboutUsContentCard;
      'about-us.content-section': AboutUsContentSection;
      'about-us.hero-section': AboutUsHeroSection;
      'about-us.stat-card': AboutUsStatCard;
      'solution.metric': SolutionMetric;
      'solution.point': SolutionPoint;
      'solution.project': SolutionProject;
      'solution.result': SolutionResult;
      'solution.tool': SolutionTool;
      'solution.visual': SolutionVisual;
    }
  }
}
