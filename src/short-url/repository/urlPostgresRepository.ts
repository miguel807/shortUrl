import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUrlRepository } from "./IUrlRepository";
import { CreateShortUrlDto } from "../dto/create-short-url.dto";
import { UpdateShortUrlDto } from "../dto/update-short-url.dto";
import { ShortUrl } from '../entities/short-url.entity';
import { NotFoundException } from '@nestjs/common';
import { UrlObject } from '../urlObject';

export class UrlPostgresRepository implements IUrlRepository{

    constructor(
        @InjectRepository(ShortUrl)
        private readonly urlRepository: Repository<ShortUrl>
    ){}

   async createUrl(urlObject: UrlObject) {
        const newUrl = this.urlRepository.create(urlObject);
        const urlCreated = await this.urlRepository.save(newUrl);
        return newUrl;
    }
    
   async deleteUl(url: string) {
        const urlValue = await this.getUrl(url);
        await this.urlRepository.delete(urlValue);
        return urlValue
    }

 async   getUrl(url: string) {
      const urlValue = await this.urlRepository.findOne({where:{url:url}});
      if(!urlValue)
            throw new NotFoundException("that url not exist");
      return urlValue;
    }
  
   async  getShortUrl(shortUrl: string) {
    const urlValue = await this.urlRepository.findOne({where:{shortUrl:shortUrl}});
    
    if(!urlValue) throw new NotFoundException("that short url not exist");
    return urlValue;
    }
   async  updateUrl(updateShortUrl: UpdateShortUrlDto) {
        const urlValue = await this.getUrl(updateShortUrl.url);
        const newShortUrl = Object.assign(urlValue,updateShortUrl);
        await this.urlRepository.save(newShortUrl);
        return newShortUrl;
    }
   
   
    async getAll() {
        return await this.urlRepository.find();
    }

}