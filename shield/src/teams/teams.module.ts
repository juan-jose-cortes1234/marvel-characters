import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../characters/character.entity.js';
import { Team } from './team.entity.js';
import { TeamsController } from './teams.controller.js';
import { TeamsService } from './teams.service.js';

@Module({
  // forFeature habilita @InjectRepository(...) para estas entidades
  imports: [TypeOrmModule.forFeature([Team, Character])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
