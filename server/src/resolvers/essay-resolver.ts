import { isAuth } from "../middleware/is-auth";
import { Context } from "../types";
import { Arg, Ctx, Mutation, Query, UseMiddleware } from "type-graphql";
import { Essay } from "../entities/essay";

export class EssayResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Essay)
    async createEssay(@Arg("title") title: string, @Ctx() { req }: Context) {
        if (title.trim().length == 0) {
            return false;
        }
        return Essay.create({
            title,
            creatorId: req.session.userId,
        }).save();
    }

    @UseMiddleware(isAuth)
    @Query(() => Essay)
    async getEssay(
        @Arg("id", () => String) id: string,
        @Ctx() { req }: Context
    ) {
        return Essay.findOne({ where: { id, creatorId: req.session.userId } });
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async starOrUnStarEssay(
        @Arg("id", () => String) id: string,
        @Ctx() { req }: Context
    ) {
        const essay = await Essay.findOne(id);
        if (essay?.creator.id != req.session.userId) {
            return false;
        }
        await Essay.update({ id }, { starred: !essay?.starred });
        return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateEssay(
        @Arg("id", () => String!) id: string,
        @Arg("title") title: string,
        @Arg("body") body: string,
        @Ctx() { req }: Context
    ) {
        const essay = await Essay.findOne(id, { relations: ["creator"] });
        if (essay?.creator.id != req.session.userId) {
            return false;
        }

        await Essay.update(id, {
            title,
            body,
        });
        return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteEssay(
        @Arg("id", () => String) id: string,
        @Ctx() { req }: Context
    ) {
        const essay = await Essay.findOne(id, { relations: ["creator"] });
        if (essay?.creator.id != req.session.userId) {
            return false;
        }
        await Essay.delete({ id });
        return true;
    }
}
