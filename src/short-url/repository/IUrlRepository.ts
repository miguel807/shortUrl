import { CreateShortUrlDto } from "../dto/create-short-url.dto";
import { UpdateShortUrlDto } from "../dto/update-short-url.dto";
import { UrlObject } from "../urlObject";

export interface IUrlRepository{
    createUrl(url:UrlObject);
    deleteUl(url:string)
    getUrl(url:string)
    getShortUrl(shortUrl:string)
    getAll()
    updateUrl(updateShortUrl:UpdateShortUrlDto)
}