import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDecoratorAddedTypes1677268227326 implements MigrationInterface {
    name = 'fixDecoratorAddedTypes1677268227326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Movies" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Movies" ADD "description" character varying`);
    }

}
