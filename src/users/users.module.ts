import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middlewares/another.middlewares.middleware';
import { ExampleMiddleware } from './middlewares/example.middleware';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes(
      {
        path: "users",
        method: RequestMethod.GET,
      },
      {
        path: "users/:id",
        method: RequestMethod.GET,
      }
    ).apply(AnotherMiddleware).forRoutes(
      {
        path: "users",
        method: RequestMethod.GET,
      },
      {
        path: "users/:id",
        method: RequestMethod.GET,
      }
    );
  }
}
