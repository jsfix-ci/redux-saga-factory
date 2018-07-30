import "reflect-metadata";
import { baseDecorator } from './baseDecorator';
import { takeWrapper } from './effectWrappers';

export function take(name) {
    return baseDecorator(name, takeWrapper);
  }
  