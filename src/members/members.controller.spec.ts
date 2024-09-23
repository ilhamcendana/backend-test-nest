import { Test, TestingModule } from '@nestjs/testing';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { Member } from '@prisma/client';

describe('MembersController', () => {
  let controller: MembersController;
  let service: MembersService;

  const mockMembersService = {
    listAllMembers: jest.fn(),
    getMember: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [
        {
          provide: MembersService,
          useValue: mockMembersService, // Use mock service
        },
      ],
    }).compile();

    controller = module.get<MembersController>(MembersController);
    service = module.get<MembersService>(MembersService);
  });

  describe('listAll', () => {
    it('should return an array of members', async () => {
      const result: Member[] = [
        { id: 1, code: 'M001', name: 'John', email: null },
        { id: 2, code: 'M002', name: 'Jane', email: null },
      ];

      // Mock the return value for listAllMembers
      mockMembersService.listAllMembers.mockResolvedValue(result);

      // Test if the controller method returns the correct value
      expect(await controller.listAll()).toBe(result);
      expect(mockMembersService.listAllMembers).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a specific member', async () => {
      const result: Member = { id: 1, code: 'M001', name: 'John', email: null };

      // Mock the return value for getMember
      mockMembersService.getMember.mockResolvedValue(result);

      // Test if the controller method returns the correct value
      expect(await controller.getOne(1)).toBe(result);
      expect(mockMembersService.getMember).toHaveBeenCalledWith(1);
    });
  });
});
