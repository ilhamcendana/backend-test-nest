import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Member } from '@prisma/client';
import { MembersService } from './members.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MemberDto } from '../../dto/member.dto';

@ApiTags('Members')
@Controller('/api/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of members successfully retrieved',
    type: [MemberDto],
  })
  async listAll(): Promise<Member[]> {
    return this.membersService.listAllMembers();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Specific of member successfully retrieved',
    type: MemberDto,
  })
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Member> {
    return await this.membersService.getMember(id);
  }
}
