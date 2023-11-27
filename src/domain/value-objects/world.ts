import { Apple } from '../objects/apple';
import { Snake } from '../objects/snake';
import { GridConfig } from './grid-config';

export type World = {
  apple: Apple;
  gridConfig: GridConfig;
  otherSnake?: Snake;
};
