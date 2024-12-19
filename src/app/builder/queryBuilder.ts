import { Query } from 'mongoose'

class QueryBuilder<T> {
  modelQuery: Query<T[], T>
  query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(fields: string[]) {
    if (this.query.search) {
      const searchRegex = new RegExp(this.query.search as string, 'i')
      this.modelQuery = this.modelQuery.find({
        $or: fields.map(field => ({ [field]: searchRegex })),
      })
    }
    return this
  }

  filter() {
    const filter = this?.query?.filter
    if (this.query.filter) {
      this.modelQuery = this.modelQuery.find({ author: filter })
    } else {
      this.modelQuery = this.modelQuery.find({})
    }
    return this
  }

  sort() {
    const sortBy = this?.query?.sortBy as string
    if (sortBy) {
      const sortOrder = this.query.sortOrder === 'desc' ? -1 : 1
      this.modelQuery = this.modelQuery.sort({
        [this.query.sortBy as string]: sortOrder,
      })
    }
    return this
  }
}

export default QueryBuilder
