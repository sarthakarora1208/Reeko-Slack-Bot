import { template, templates } from './../constants/templates';

export const findTemplate = (templateName: string) => {
  return templates.filter(
    (template: template) => template.name === templateName
  )[0];
};
