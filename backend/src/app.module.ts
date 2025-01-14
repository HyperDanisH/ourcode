import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { UserMiddleware } from './auth/middleware/user.middleware';

@Module({
  imports: [AuthModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude(
        { path: 'auth/(.*)', method: RequestMethod.GET },
        { path: 'auth/(.*)', method: RequestMethod.POST },

        { path: '/', method: RequestMethod.GET },
        {
          path: '',
          method: RequestMethod.GET,
        },
      )
      .forRoutes('*');
  }
}
