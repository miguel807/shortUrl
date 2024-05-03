import { Module } from '@nestjs/common';

import { ShortUrlController } from './short-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortUrl } from './entities/short-url.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUrlCommandHandler } from './command/createUrl/createUrlCommandHandler';
import { GetUrlQueryHandler } from './query/getUrl/getUrlQueryHandler';
import { UrlPostgresRepository } from './repository/urlPostgresRepository';
import { GetAllUrlQueryHandler } from './query/getAllUrl/getAllUrlQueryHandler';
import { RedirectQueryHandler } from './query/redirect/redirectQueryHandler';
import { DeleteUrlCommandHandler } from './command/deleteUrl/deleteUrlCommandHandler';

export const CommandHandler = [CreateUrlCommandHandler,DeleteUrlCommandHandler]
export const QueryHandler = [GetUrlQueryHandler,GetAllUrlQueryHandler,RedirectQueryHandler]
@Module({
  imports:[CqrsModule,TypeOrmModule.forFeature([ShortUrl])],
  controllers: [ShortUrlController],
  providers: [ { provide: 'IUrlRepository', useClass: UrlPostgresRepository },...QueryHandler,...CommandHandler],
})
export class ShortUrlModule {}
