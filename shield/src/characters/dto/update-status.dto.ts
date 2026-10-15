import { IsEnum } from 'class-validator';
import { CharacterStatus } from '../character.entity.js';

// Body de PATCH /characters/:id/status
export class UpdateStatusDto {
  @IsEnum(CharacterStatus)
  status: CharacterStatus;
}
