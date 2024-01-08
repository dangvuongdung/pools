import {MigrationInterface, QueryRunner} from "typeorm";

export class createPoolTable1704719429930 implements MigrationInterface {
    name = 'createPoolTable1704719429930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test"."pools" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "apr" numeric NOT NULL, "extra_apr" numeric NOT NULL, "tvl" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_259dbe7ce671508f02d00dd592a" UNIQUE ("type"), CONSTRAINT "PK_6708c86fc389259de3ee43230ee" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test"."pools"`);
    }

}
