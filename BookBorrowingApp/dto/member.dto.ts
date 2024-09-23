import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  @ApiProperty({ example: 321 })
  id: number;

  @ApiProperty({ example: 'M002' })
  code: string;

  @ApiProperty({ example: 'Ferry' })
  name: string;

  @ApiProperty({ example: '' })
  email: string;
}
