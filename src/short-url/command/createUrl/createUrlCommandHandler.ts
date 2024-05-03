import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUrlCommand } from "./createUrlCommand";
import { IUrlRepository } from "../../repository/IUrlRepository";
import { Inject } from "@nestjs/common";
import { UrlObject } from "../../urlObject";
import { nanoid } from 'nanoid'

@CommandHandler(CreateUrlCommand)
export class CreateUrlCommandHandler implements ICommandHandler<CreateUrlCommand> {

    constructor(
      @Inject('IUrlRepository')
      private urlRepository: IUrlRepository,
    ){}

  async execute(command: CreateUrlCommand): Promise<void> {
   
    const {url} = command;
    const code = nanoid(6);
    const newShortUrl = new UrlObject(url,code);
    return await this.urlRepository.createUrl(newShortUrl)
  }
}