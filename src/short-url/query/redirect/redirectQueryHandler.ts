import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { RedirectQuery } from "./redirectQuery";
import { Inject } from "@nestjs/common";
import { IUrlRepository } from "src/short-url/repository/IUrlRepository";



@QueryHandler(RedirectQuery)
export class RedirectQueryHandler implements IQueryHandler<RedirectQuery>{

    constructor(
        @Inject('IUrlRepository')
        private urlRepository: IUrlRepository,
      ){}
      
   async  execute(query: RedirectQuery): Promise<any> {
         const {url} = query;
         const urlValue = await this.urlRepository.getShortUrl(url);
         
         urlValue.visitCount +=1;
          await this.urlRepository.updateUrl(urlValue);
         return await urlValue
    }  
    
}