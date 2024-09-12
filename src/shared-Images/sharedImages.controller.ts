// import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
// import { NotFoundException } from '@nestjs/common';
// import { UserService } from '../user/user.service';
// import { SharedImagesService } from './sharedImages.service';
// import { SharedImage } from './sharedImage.entity';
// import { Public } from 'src/auth/decorators/public.decorator';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { SharedImagesGateway } from './sharedImages.gateway';
// @UseGuards(JwtAuthGuard) 
// @Controller('shared-images')
// export class SharedImagesController {
//   constructor(
//     private readonly sharedImagesService: SharedImagesService,
//     private readonly userService: UserService,
//     private readonly sharedImagesGateway: SharedImagesGateway,  
//   ) {}

//   @Post(':userId')
//   async createSharedImage(
//     @Param('userId') userId: string,
//     @Body('imageTitle') imageTitle: string,
//     @Body('imageUrl') imageUrl: string,
//   ) {
//     const user = await this.userService.findById(userId);
//     if (!user) {
//       throw new NotFoundException(`User with id ${userId} not found`);
//     }
//     return this.sharedImagesService.createSharedImage(user, imageTitle, imageUrl);
//   }
//   @Public()
//   @Get()
//   async getAllSharedImages(): Promise<SharedImage[]> {
//     return this.sharedImagesService.findAll();
//   }
// }

import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SharedImagesService } from './sharedImages.service';
import { SharedImage } from './sharedImage.entity';
import { SharedImagesGateway } from './sharedImages.gateway';  // Import the WebSocket Gateway

@Controller('shared-images')
export class SharedImagesController {
  constructor(
    private readonly sharedImagesService: SharedImagesService,
    private readonly userService: UserService,
    private readonly sharedImagesGateway: SharedImagesGateway,  // Inject the WebSocket Gateway
  ) {}

  @Post(':userId')
  async createSharedImage(
    @Param('userId') userId: string,
    @Body('imageTitle') imageTitle: string,
    @Body('imageUrl') imageUrl: string,
  ) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const newImage = await this.sharedImagesService.createSharedImage(
      user,
      imageTitle,
      imageUrl,
    );

    // Emit the new shared image to all connected clients
    this.sharedImagesGateway.broadcastNewImage(newImage);

    return newImage;
  }

  @Get()
  async getAllSharedImages(): Promise<SharedImage[]> {
    return this.sharedImagesService.findAll();
  }
}
