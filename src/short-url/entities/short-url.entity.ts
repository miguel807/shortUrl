import { Column, Entity,PrimaryColumn } from "typeorm";

@Entity()
export class ShortUrl {

    @PrimaryColumn()
    url:string

    @Column()
    shortUrl:string

    @Column()
    visitCount:number = 0;
}
