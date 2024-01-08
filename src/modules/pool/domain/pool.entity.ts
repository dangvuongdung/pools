import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IPoolModel } from './pool.model'

@Entity('pools')
export class Pool implements IPoolModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
    })
    type: string

    @Column({
        type: 'numeric',
        nullable: false,
    })
    apr: number

    @Column({
        type: 'numeric',
        nullable: false,
    })
    extra_apr: number

    @Column({
        type: 'numeric',
        nullable: false,
    })
    tvl: number

    @Column({
        name: 'created_at',
        type: 'timestamp',
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at?: Date

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        precision: null,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at?: Date
}
