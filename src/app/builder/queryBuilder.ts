import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search
    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map(
        fields =>
          ({
            [fields]: { $regex: search, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    })
    return this
  }
}

export default QueryBuilder
