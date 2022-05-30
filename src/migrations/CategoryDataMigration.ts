import { MigrationInterface, QueryRunner } from 'typeorm'

export class CategoryDataMigration1653878763755 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO public.categories(description) VALUES ('Categoria 1'),('Categoria 2'),('Categoria 3');`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}
