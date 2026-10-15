import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import { Team } from '../teams/team.entity.js';

// Los valores deben coincidir EXACTAMENTE con los de la base de datos
export enum CharacterStatus {
  ACTIVE = 'ACTIVE',
  INJURED = 'INJURED',
  MISSING = 'MISSING',
  RETIRED = 'RETIRED',
}

// Mapea la tabla "characters" que ya existe en la BD
@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  real_name: string;

  @Column({ unique: true })
  alias: string;

  @Column()
  main_power: string;

  @Column({ type: 'int' })
  power_level: number;

  @Column({ type: 'varchar', default: CharacterStatus.ACTIVE })
  status: CharacterStatus;

  @Column({ default: false })
  is_villain: boolean;

  // Columna FK "cruda": útil para filtrar y asignar equipo con solo el id
  @Column({ type: 'int', nullable: true })
  team_id: number | null;

  // Relación: muchos personajes -> un equipo (0..1)
  @ManyToOne(() => Team, (team) => team.characters, { nullable: true })
  @JoinColumn({ name: 'team_id' })
  team: Relation<Team> | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
