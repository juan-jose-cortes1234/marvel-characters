import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

// Body de PATCH /teams/:id/characters
export class AssignCharactersDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  characterIds: number[];
}
