import { Controller, Get, Post, Body, Patch, Param, Delete, Redirect } from '@nestjs/common';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UpdateShortUrlDto } from './dto/update-short-url.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUrlCommand } from './command/createUrl/createUrlCommand';
import { GetUrlQuery } from './query/getUrl/getUrlQuery';
import { GetAllUrlQuery } from './query/getAllUrl/getAllUrlQuery';
import { RedirectQuery } from './query/redirect/redirectQuery';
import { DeleteUrlCommand } from './command/deleteUrl/deleteUrlCommand';

@Controller('short-url')
export class ShortUrlController {
  constructor(private readonly commandBus:CommandBus,
              private readonly queryBus:QueryBus) {}

  @Post()
  create(@Body() createShortUrlDto: CreateShortUrlDto) {

    return this.commandBus.execute(new CreateUrlCommand(createShortUrlDto.url)); 
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllUrlQuery());
  }

  @Get(':url')
  findOne(@Param('url') url: string) {
   
    return this.queryBus.execute(new GetUrlQuery(url));
  }


  @Delete(':url')
  remove(@Param('url') url: string) {
    return this.commandBus.execute(new DeleteUrlCommand(url));
  }

  


  @Redirect()
  @Get('redirect/:url')
 async redirect(@Param('url') url: string){
    const redirectUrl =  await this.queryBus.execute(new RedirectQuery(url))
  
   return {url:redirectUrl.url}
    
  }


}
