"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssayResolver = void 0;
const is_auth_1 = require("../middleware/is-auth");
const type_graphql_1 = require("type-graphql");
const essay_1 = require("../entities/essay");
class EssayResolver {
    async createEssay(title, { req }) {
        if (title.trim().length == 0) {
            return false;
        }
        return essay_1.Essay.create({
            title,
            creatorId: req.session.userId,
        }).save();
    }
    async getEssay(id, { req }) {
        return essay_1.Essay.findOne({ where: { id, creatorId: req.session.userId } });
    }
    async starOrUnStarEssay(id, { req }) {
        console.log(id);
        const essay = await essay_1.Essay.findOne(id, { relations: ["creator"] });
        if ((essay === null || essay === void 0 ? void 0 : essay.creator.id) != req.session.userId) {
            return false;
        }
        await essay_1.Essay.update({ id }, { starred: !(essay === null || essay === void 0 ? void 0 : essay.starred) });
        return true;
    }
    async updateEssay(id, title, body, { req }) {
        const essay = await essay_1.Essay.findOne(id, { relations: ["creator"] });
        if ((essay === null || essay === void 0 ? void 0 : essay.creator.id) != req.session.userId) {
            return false;
        }
        await essay_1.Essay.update(id, {
            title,
            body,
        });
        return true;
    }
    async deleteEssay(id, { req }) {
        const essay = await essay_1.Essay.findOne(id, { relations: ["creator"] });
        if ((essay === null || essay === void 0 ? void 0 : essay.creator.id) != req.session.userId) {
            return false;
        }
        await essay_1.Essay.delete({ id });
        return true;
    }
}
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => essay_1.Essay),
    __param(0, (0, type_graphql_1.Arg)("title")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "createEssay", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.isAuth),
    (0, type_graphql_1.Query)(() => essay_1.Essay),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "getEssay", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "starOrUnStarEssay", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Arg)("title")),
    __param(2, (0, type_graphql_1.Arg)("body")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "updateEssay", null);
__decorate([
    (0, type_graphql_1.UseMiddleware)(is_auth_1.isAuth),
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EssayResolver.prototype, "deleteEssay", null);
exports.EssayResolver = EssayResolver;
//# sourceMappingURL=essay-resolver.js.map