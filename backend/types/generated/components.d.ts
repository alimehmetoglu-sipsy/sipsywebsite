import type { Schema, Struct } from '@strapi/strapi';

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
      'solution.metric': SolutionMetric;
      'solution.point': SolutionPoint;
      'solution.project': SolutionProject;
      'solution.result': SolutionResult;
      'solution.tool': SolutionTool;
      'solution.visual': SolutionVisual;
    }
  }
}
