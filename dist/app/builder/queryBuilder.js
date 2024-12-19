"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(fields) {
        if (this.query.search) {
            const searchRegex = new RegExp(this.query.search, 'i');
            this.modelQuery = this.modelQuery.find({
                $or: fields.map(field => ({ [field]: searchRegex })),
            });
        }
        return this;
    }
    filter() {
        var _a;
        const filter = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (this.query.filter) {
            this.modelQuery = this.modelQuery.find({ author: filter });
        }
        else {
            this.modelQuery = this.modelQuery.find({});
        }
        return this;
    }
    sort() {
        var _a;
        const sortBy = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy;
        if (sortBy) {
            const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1;
            this.modelQuery = this.modelQuery.sort({
                [this.query.sortBy]: sortOrder,
            });
        }
        return this;
    }
}
exports.default = QueryBuilder;
