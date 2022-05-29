import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

export const TypeormOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  logging: process.env.DEBUG_SQL === 'true' ? true : false,
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: { migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR },
}

export const DatabaseConnection: DynamicModule = TypeOrmModule.forRoot(TypeormOptions)
