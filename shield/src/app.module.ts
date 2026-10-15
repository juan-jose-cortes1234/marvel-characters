import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Character } from './characters/character.entity.js';
import { CharactersModule } from './characters/characters.module.js';
import { Team } from './teams/team.entity.js';
import { TeamsModule } from './teams/teams.module.js';

@Module({
  imports: [
    // Conexión a la BD del docker-compose (datos de .env.example)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5433),
      username: process.env.DB_USER ?? 'marvel',
      password: process.env.DB_PASSWORD ?? 'marvel123',
      database: process.env.DB_NAME ?? 'marvel_db',
      entities: [Team, Character],
      synchronize: false, // ¡NO crear ni modificar tablas! (requisito del taller)
    }),
    TeamsModule,
    CharactersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
