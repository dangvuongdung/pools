import {MigrationInterface, QueryRunner} from "typeorm";

export class addAppPoolTable1704898308784 implements MigrationInterface {
    name = 'addAppPoolTable1704898308784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test"."pools" ADD "app" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test"."pools" DROP COLUMN "app"`);
    }

}
