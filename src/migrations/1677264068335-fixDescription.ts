import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDescription1677264068335 implements MigrationInterface {
    name = 'fixDescription1677264068335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movies" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movies" ALTER COLUMN "description" SET NOT NULL`);
    }

}
