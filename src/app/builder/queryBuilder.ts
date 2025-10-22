import { FilterQuery, Query } from "mongoose";
import { IQueryParams } from "../interface/queryParams.interface";

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: IQueryParams;

  constructor(modelQuery: Query<T[], T>, query: IQueryParams) {
    this.queryModel = modelQuery;
    this.query = query;
  }
  // ----- search ----- //
  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: {
                $regex: search,
                $options: "i",
              },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  // ----- filter ----- //
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "search",
      "sortBy",
      "sortOrder",
      "page",
      "limit",
      "populate",
    ];

    excludeFields.forEach((el) => delete (queryObj as Record<string, any>)[el]);
     Object.keys(queryObj).forEach((key) => {
       const value = (queryObj as Record<string, any>)[key];
       if (
         value === "" ||
         value === "all" ||
         value === undefined ||
         value === null
       ) {
         delete (queryObj as Record<string, any>)[key];
       }
     });
    this.queryModel = this.queryModel.find(queryObj as FilterQuery<T>);

    return this;
  }

  // ----- sort ----- //
  sort() {
    const sortBy = this.query.sortBy || "createdAt";
    const sortOrder = this.query.sortOrder || "desc";

    // Convert sortOrder to 1 or -1
    const order = sortOrder === "asc" ? 1 : -1;

    this.queryModel = this.queryModel.sort({ [sortBy as string]: order });

    return this;
  }

  // ----- paginate ----- //
  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 5;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  // ----- populate ----- //
  populate(populateFields?: Array<{ path: string; select?: string }>) {
    if (populateFields && populateFields.length > 0) {
      populateFields.forEach((field) => {
        this.queryModel = this.queryModel.populate(field.path, field.select);
      });
    }
    return this;
  }
}

export default QueryBuilder;
