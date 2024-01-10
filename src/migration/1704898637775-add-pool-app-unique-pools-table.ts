import {MigrationInterface, QueryRunner} from "typeorm";

export class addPoolAppUniquePoolsTable1704898637775 implements MigrationInterface {
    name = 'addPoolAppUniquePoolsTable1704898637775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test"."pools" ADD CONSTRAINT "pool_app" UNIQUE ("type", "app")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test"."pools" DROP CONSTRAINT "pool_app"`);
    }

}
