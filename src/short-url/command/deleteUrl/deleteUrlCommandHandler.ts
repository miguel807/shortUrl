import { ICommandHandler,CommandHandler } from "@nestjs/cqrs";
import { DeleteUrlCommand } from "./deleteUrlCommand";
import { Inject } from "@nestjs/common";
import { IUrlRepository } from "src/short-url/repository/IUrlRepository";


@CommandHandler(DeleteUrlCommand)
export class DeleteUrlCommandHandler implements ICommandHandler<DeleteUrlCommand>{
    
    constructor(
        @Inject('IUrlRepository')
        private urlRepository: IUrlRepository,
      ){}
      
   async  execute(command: DeleteUrlCommand): Promise<any> {
        const {url} = command;
        return await this.urlRepository.deleteUl(url);
    }
    
}