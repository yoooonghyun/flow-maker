/*
 * Copyright (c) 2021 Medir Inc.
 * Created on Sat Oct 02 2021
 */

/* NestJS libraries */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
/* Installed libraries */
/* Module */
import { ConfigModule } from '@nestjs/config';
import { HttpLogger } from 'src/middleware/http.logger';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLogger).forRoutes('/');
  }
}
