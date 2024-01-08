import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDefined, IsNumber } from 'class-validator'

export class MintDto {
    @ApiProperty({
        example: `0xabc0000000000000000000000000000000000000`,
        required: true,
        description: 'address',
    })
    @IsDefined()
    address: string

    @ApiProperty({
        example: 1701270664,
        required: true,
        description: 'timestamp expire',
    })
    @IsDefined()
    expire: number

    @ApiProperty({
        example: 1,
        required: true,
        description: 'token id',
    })
    @IsDefined()
    token_id: number
}

export class ParamId {
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    id!: number
}
