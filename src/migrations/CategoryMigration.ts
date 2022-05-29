import { MigrationInterface, QueryRunner } from 'typeorm'

export class CategoryMigration1653834941676 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS public.categories
    (
        id serial NOT NULL,
        description character varying NOT NULL,
        created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT categories_pkey PRIMARY KEY (id)
    );`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.categories;`)
  }
}
