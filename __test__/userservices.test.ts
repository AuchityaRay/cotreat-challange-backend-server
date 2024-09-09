import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';
import { SharedImage } from '../src/shared-Images/sharedImage.entity';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let sharedImageRepository: Repository<SharedImage>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SharedImage),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    sharedImageRepository = module.get<Repository<SharedImage>>(getRepositoryToken(SharedImage));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOrCreate', () => {
    it('should create a new user if not found', async () => {
      const mockUser = { id: '1', username: 'testuser' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);

      const result = await service.findOrCreate('testuser');
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
      expect(userRepository.create).toHaveBeenCalledWith({ username: 'testuser' });
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should return the existing user if found', async () => {
      const mockUser = { id: '1', username: 'testuser' } as User;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

      const result = await service.findOrCreate('testuser');
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('addFavorite', () => {
    it('should add a favorite image to the user', async () => {
      const mockUser = { id: '1', favorites: [] } as User;
      const mockImage = { id: '1', imageUrl: 'someUrl' } as SharedImage;

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);
      jest.spyOn(sharedImageRepository, 'findOne').mockResolvedValue(mockImage);
      jest.spyOn(userRepository, 'save').mockResolvedValue({ ...mockUser, favorites: [mockImage] });

      const result = await service.addFavorite('1', '1');
      expect(service.findById).toHaveBeenCalledWith('1');
      expect(sharedImageRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result.favorites).toContain(mockImage);
    });

    it('should throw NotFoundException if image not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue({ id: '1', favorites: [] } as User);
      jest.spyOn(sharedImageRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.addFavorite('1', 'non-existing-image')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getUserFavorites', () => {
    it('should return the user favorites', async () => {
      const mockImage = { id: '1', imageUrl: 'someUrl' } as SharedImage;
      const mockUser = { id: '1', favorites: [mockImage] } as User;

      jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

      const result = await service.getUserFavorites('1');
      expect(service.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual([mockImage]);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(undefined);

      await expect(service.getUserFavorites('non-existing-user')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
