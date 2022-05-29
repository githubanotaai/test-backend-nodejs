import { MigrationInterface, QueryRunner } from 'typeorm'

export class ProductMigration1653835471661 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS public.products
    (
        id serial NOT NULL,
        title character varying NOT NULL,
        price numeric(255,2) NOT NULL,
        category_id integer NOT NULL,
        created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT products_pkey PRIMARY KEY (id),
        CONSTRAINT products_title_unique UNIQUE (title),
        CONSTRAINT products_category_id_foreign_key FOREIGN KEY (category_id)
            REFERENCES public.categories (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE NO ACTION
    );`)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE public.products;`)
  }
}
