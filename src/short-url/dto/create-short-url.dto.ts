import { IsString } from "class-validator";

export class CreateShortUrlDto {

    @IsString()
    url:string
}
