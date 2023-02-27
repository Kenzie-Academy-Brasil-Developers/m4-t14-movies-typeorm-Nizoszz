import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDescriptionType1677264747942 implements MigrationInterface {
    name = 'fixDescriptionType1677264747942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Movies" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Movies" ADD "description" character varying`);
    }

}
