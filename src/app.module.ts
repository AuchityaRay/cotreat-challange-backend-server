


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { SharedImage } from './shared-Images/sharedImage.entity';
import { SharedImagesModule } from './shared-Images/sharedImages.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3036, 
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,SharedImage],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    SharedImagesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
