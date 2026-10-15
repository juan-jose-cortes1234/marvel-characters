import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Team } from '../teams/team.entity.js';
import { Character, CharacterStatus } from './character.entity.js';
import { CharacterDto } from './dto/character.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly charactersRepository: Repository<Character>,
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  // GET /characters?status=ACTIVE&teamId=1  (ambos filtros son opcionales)
  findAll(status?: CharacterStatus, teamId?: number): Promise<Character[]> {
    const where: FindOptionsWhere<Character> = {};
    if (status) where.status = status;
    if (teamId) where.team_id = teamId;
    return this.charactersRepository.find({ where });
  }

  // GET /characters/:id  -> incluye los datos de su equipo
  async findOne(id: number): Promise<Character> {
    const character = await this.charactersRepository.findOne({
      where: { id },
      relations: { team: true },
    });
    if (!character) {
      throw new NotFoundException(`El personaje ${id} no existe`);
    }
    return character;
  }

  // POST /characters
  async create(dto: CharacterDto): Promise<Character> {
    // TODO:
    //  - 409 si el alias ya existe (regla 2)
    //  - si viene team_id: 404 si el equipo no existe, 400 si no está activo (regla 4)
    //  - return this.charactersRepository.save(dto)
    throw new NotImplementedException();
  }

  // PUT /characters/:id
  async update(id: number, dto: CharacterDto): Promise<Character> {
    // TODO: 404 si no existe + mismas validaciones que create
    //       (el alias solo choca si lo usa OTRO personaje)
    throw new NotImplementedException();
  }

  // PATCH /characters/:id/status
  async updateStatus(id: number, dto: UpdateStatusDto): Promise<Character> {
    // TODO: 404 si no existe; 400 si pasa de RETIRED a INJURED (regla 7)
    throw new NotImplementedException();
  }

  // DELETE /characters/:id
  async remove(id: number): Promise<void> {
    // TODO: 404 si no existe, luego this.charactersRepository.delete(id)
    throw new NotImplementedException();
  }
}
