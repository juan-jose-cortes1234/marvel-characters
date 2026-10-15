import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AssignCharactersDto } from './dto/assign-characters.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { TeamDto } from './dto/team.dto.js';
import { TeamsService } from './teams.service.js';

// El controlador solo recibe la petición y delega al servicio.
// POST responde 201 y el resto 200 por defecto.
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  // ParseIntPipe convierte "5" -> 5 y responde 400 si no es número
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findOne(id);
  }

  @Get(':id/characters')
  findCharacters(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.findCharacters(id);
  }

  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.teamsService.create(dto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: TeamDto) {
    return this.teamsService.update(id, dto);
  }

  @Patch(':id/characters')
  assignCharacters(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AssignCharactersDto,
  ) {
    return this.teamsService.assignCharacters(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamsService.remove(id);
  }
}
