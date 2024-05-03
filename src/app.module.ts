import { Module } from '@nestjs/common';
import { ShortUrlModule } from './short-url/short-url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5444,
    username: 'enterprisedb',
    password: 'admin',
    database: 'urlSchema',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true,
  }),ShortUrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
