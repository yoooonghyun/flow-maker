/*
 * Copyright (c) 2023 Medir Inc.
 * Created on Mon Feb 06 2023
 */

import { applyDecorators } from '@nestjs/common';
import {
  InputType,
  InputTypeOptions,
  ObjectType,
  ObjectTypeOptions,
} from '@nestjs/graphql';

type ModelOptions = ObjectTypeOptions & InputTypeOptions;

export function Model(params: ModelOptions): ClassDecorator {
  return applyDecorators(ObjectType(params), InputType(params));
}
