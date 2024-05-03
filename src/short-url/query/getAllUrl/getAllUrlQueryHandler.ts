import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllUrlQuery } from "./getAllUrlQuery";
import { Inject } from "@nestjs/common";
import { IUrlRepository } from "src/short-url/repository/IUrlRepository";

@QueryHandler(GetAllUrlQuery)
export class GetAllUrlQueryHandler implements IQueryHandler<GetAllUrlQuery>{

    
    constructor(
        @Inject('IUrlRepository')
        private urlRepository: IUrlRepository,
      ){}

    async execute(query: GetAllUrlQuery): Promise<any> {
        return await this.urlRepository.getAll();
    }
}