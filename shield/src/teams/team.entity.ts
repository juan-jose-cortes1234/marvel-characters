import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import { Character } from '../characters/character.entity.js';

// Mapea la tabla "teams" que ya existe en la BD
@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  base: string | null;

  @Column({ type: 'int', nullable: true })
  founded_year: number | null;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relación: un equipo -> muchos personajes
  @OneToMany(() => Character, (character) => character.team)
  characters: Relation<Character[]>;
}
