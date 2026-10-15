import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

// Body de PUT /teams/:id (reemplaza el equipo completo)
export class TeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  base?: string;

  @IsOptional()
  @IsInt()
  founded_year?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
