import { IQueryHandler,QueryHandler } from "@nestjs/cqrs";
import { GetUrlQuery } from "./getUrlQuery";
import { Inject } from "@nestjs/common";
import { IUrlRepository } from "../../repository/IUrlRepository";

@QueryHandler(GetUrlQuery)
export class GetUrlQueryHandler implements IQueryHandler<GetUrlQuery>{

    constructor(
        @Inject('IUrlRepository')
        private urlRepository: IUrlRepository,
      ){}
      
   async  execute(query: GetUrlQuery): Promise<any> {
       const {url} = query;
       return await this.urlRepository.getUrl(url);

    }

}