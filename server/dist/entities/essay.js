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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Essay = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let Essay = class Essay extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Essay.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: "Untitled essay" }),
    __metadata("design:type", String)
], Essay.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ nullable: true, default: "Start writing here..." }),
    __metadata("design:type", String)
], Essay.prototype, "body", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User),
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.essays),
    __metadata("design:type", user_1.User)
], Essay.prototype, "creator", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Essay.prototype, "creatorId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Essay.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Essay.prototype, "updatedAt", void 0);
Essay = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Essay);
exports.Essay = Essay;
//# sourceMappingURL=essay.js.map