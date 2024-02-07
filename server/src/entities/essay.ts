import { Field, ObjectType } from "type-graphql";
import {
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { User } from "./user";

@ObjectType()
@Entity()
export class Essay extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column({ default: "Untitled essay" })
    title: string;

    @Field()
    @Column({ default: false })
    starred: boolean;

    @Field()
    @Column({ default: false })
    published: boolean;

    @Field(() => String)
    @Column({ default: "" })
    body: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.essays)
    creator: User;

    @Field()
    @Column()
    creatorId: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
