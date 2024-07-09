import { DbConnectionUS } from "../shared/dbConnectionUS";
import AsinCollectionModel from "../models/asin-collection";

export interface Asin {
  _id: string;
  asin: string
  lastControl_product_offers: Date
  lastControl_catalog_item: Date,
  lastControl_competitive_summary: Date,
  createdAt: Date,
  updatedAt: Date,
}

export class AsinCollectionService {
  @DbConnectionUS()
  async getAsinCollections(
    startDate:Date,
    endDate: Date,
    limit: number
  ): Promise<Asin[]> {
    const asinCollection = await AsinCollectionModel.find({})
      .sort({ updatedAt: -1 })
      .limit(limit)
      .exec();

    return asinCollection;
  }
  @DbConnectionUS()
  async getAsinCollectionCount(
    startDate:Date,
    endDate: Date,
    limit: number
  ): Promise<number> {
    const count = await AsinCollectionModel.countDocuments();
    return count;
  }
}
