import {
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../characters/character.entity.js';
import { AssignCharactersDto } from './dto/assign-characters.dto.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { TeamDto } from './dto/team.dto.js';
import { Team } from './team.entity.js';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
  ) {}

  // GET /teams
  findAll(): Promise<Team[]> {
    return this.teamsRepository.find();
  }

  // GET /teams/:id  -> 404 si no existe (regla 1)
  async findOne(id: number): Promise<Team> {
    const team = await this.teamsRepository.findOneBy({ id });
    if (!team) {
      throw new NotFoundException(`El equipo ${id} no existe`);
    }
    return team;
  }

  // GET /teams/:id/characters
  async findCharacters(id: number): Promise<Character[]> {
    // TODO: validar que el equipo exista (findOne) y devolver
    //       this.charactersRepository.find({ where: { team_id: id } })
    throw new NotImplementedException();
  }

  // POST /teams  -> 409 si el name ya existe (regla 2)
  async create(dto: CreateTeamDto): Promise<Team> {
    const { characterIds, ...data } = dto;

    const exists = await this.teamsRepository.findOneBy({ name: data.name });
    if (exists) {
      throw new ConflictException(`Ya existe un equipo llamado ${data.name}`);
    }

    const team = await this.teamsRepository.save(data);

    // TODO (regla 5): si llegan characterIds, asignarlos al equipo
    //       (se puede reutilizar assignCharacters)

    return team;
  }

  // PUT /teams/:id
  async update(id: number, dto: TeamDto): Promise<Team> {
    // TODO: 404 si no existe, 409 si el nuevo name lo usa OTRO equipo,
    //       luego this.teamsRepository.save({ ...team, ...dto })
    throw new NotImplementedException();
  }

  // PATCH /teams/:id/characters
  async assignCharacters(id: number, dto: AssignCharactersDto): Promise<Team> {
    // TODO (regla 5):
    //  - 404 si el equipo no existe, 400 si no está activo
    //  - 404 si algún personaje no existe (pista: findBy({ id: In(ids) }))
    //  - this.charactersRepository.update({ id: In(ids) }, { team_id: id })
    throw new NotImplementedException();
  }

  // DELETE /teams/:id
  async remove(id: number): Promise<void> {
    // TODO (regla 6): 404 si no existe, 409 si tiene personajes asociados,
    //       luego this.teamsRepository.delete(id)
    throw new NotImplementedException();
  }
}
