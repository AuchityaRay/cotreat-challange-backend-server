// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { UserModule } from '../user/user.module';
// import { SharedImage } from './sharedImage.entity';
// import { SharedImagesService } from './sharedImages.service';
// import { SharedImagesController } from './sharedImages.controller';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([SharedImage]),
//     UserModule,
//   ],
//   providers: [SharedImagesService, ],
//   controllers: [SharedImagesController],
//     exports: [SharedImagesService]
// })
// export class SharedImagesModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { SharedImage } from './sharedImage.entity';
import { SharedImagesService } from './sharedImages.service';
import { SharedImagesController } from './sharedImages.controller';
import { SharedImagesGateway } from './sharedImages.gateway';  // Import the WebSocket Gateway

@Module({
  imports: [
    TypeOrmModule.forFeature([SharedImage]),  // Import the SharedImage entity
    UserModule,  // Import UserModule to have access to UserService
  ],
  providers: [
    SharedImagesService,  // Provide the service that handles shared images
    SharedImagesGateway,  // Provide the WebSocket Gateway for real-time updates
  ],
  controllers: [SharedImagesController],  // Register the controller
  exports: [SharedImagesService],  // Export SharedImagesService if needed elsewhere
})
export class SharedImagesModule {}
