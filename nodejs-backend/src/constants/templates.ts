import {
  BLACK_PLAIN,
  TEMPLATE_1,
  TEMPLATE_2,
  TEMPLATE_3,
  TEMPLATE_4,
} from './background';
import { ZILLA_SLAB } from './fonts';
import { FONT_SIZE_STANDARD } from './imageMeasurements';
import {
  BACKGROUND_TEMPLATE_1,
  BACKGROUND_TEMPLATE_2,
  BACKGROUND_TEMPLATE_3,
  BACKGROUND_TEMPLATE_4,
  BLACK,
} from './templateNames';
export interface template {
  name: string;
  background: string;
  font: {
    family: string;
    size: number;
    color: string;
  };
}

export const templates: template[] = [
  {
    name: BACKGROUND_TEMPLATE_1,
    background: TEMPLATE_1,
    font: {
      family: ZILLA_SLAB,
      size: FONT_SIZE_STANDARD * 0.95,
      color: '#000',
    },
  },
  {
    name: BACKGROUND_TEMPLATE_2,
    background: TEMPLATE_2,
    font: {
      family: ZILLA_SLAB,
      size: FONT_SIZE_STANDARD * 0.95,
      color: '#000',
    },
  },
  {
    name: BACKGROUND_TEMPLATE_3,
    background: TEMPLATE_3,
    font: {
      family: ZILLA_SLAB,
      size: FONT_SIZE_STANDARD * 0.95,
      color: '#fff',
    },
  },
  {
    name: BACKGROUND_TEMPLATE_4,
    background: TEMPLATE_4,
    font: {
      family: ZILLA_SLAB,
      size: FONT_SIZE_STANDARD * 0.95,
      color: '#fff',
    },
  },
];
