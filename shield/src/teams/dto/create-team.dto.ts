import { IsArray, IsInt, IsOptional } from 'class-validator';
import { TeamDto } from './team.dto.js';

// Body de POST /teams: igual a TeamDto + lista opcional de personajes
export class CreateTeamDto extends TeamDto {
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  characterIds?: number[];
}
