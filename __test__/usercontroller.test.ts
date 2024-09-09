import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/user/user.controller';
import { UserService } from '../src/user/user.service';
import { NotFoundException } from '@nestjs/common';
import { User } from '../src/user/user.entity';
import { SharedImage } from 'src/shared-Images/sharedImage.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOrCreate: jest.fn(),
            findById: jest.fn(),
            addFavorite: jest.fn(),
            removeFavorite: jest.fn(),
            getUserFavorites: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('login', () => {
    it('should return the user ID after login', async () => {
      const mockUser = { id: '1', username: 'testuser' } as User;
      jest.spyOn(service, 'findOrCreate').mockResolvedValue(mockUser);

      const result = await controller.login('testuser');
      expect(service.findOrCreate).toHaveBeenCalledWith('testuser');
      expect(result).toEqual({ userId: '1' });
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const mockUser = { id: '1', username: 'testuser' } as User;
      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

      const result = await controller.getUserById('1');
      expect(service.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(service, 'findById').mockRejectedValue(new NotFoundException());

      await expect(controller.getUserById('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('addFavorite', () => {
    it('should add a favorite image to the user', async () => {
      const mockUser = { id: '1', favorites: [] } as User;
      jest.spyOn(service, 'addFavorite').mockResolvedValue(mockUser);

      const result = await controller.addFavorite('1', '1');
      expect(service.addFavorite).toHaveBeenCalledWith('1', '1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserFavorites', () => {
    it('should return the user favorites', async () => {
      const mockFavorites = [{ id: '1', imageUrl: 'someUrl' }] as SharedImage[];
      jest.spyOn(service, 'getUserFavorites').mockResolvedValue(mockFavorites);

      const result = await controller.getUserFavorites('1');
      expect(service.getUserFavorites).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockFavorites);
    });
  });
});
