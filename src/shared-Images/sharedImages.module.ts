import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { SharedImage } from './sharedImage.entity';
import { SharedImagesService } from './sharedImages.service';
import { SharedImagesController } from './sharedImages.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedImage]),
    UserModule,
  ],
  providers: [SharedImagesService],
  controllers: [SharedImagesController],
})
export class SharedImagesModule {}
