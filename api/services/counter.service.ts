import AsinCollectionModel from '../models/asin-collection';
import CatalogItemModel from '../models/catalog-item';
import CompetitiveSummaryModel from '../models/competitive-summary';
import ProductOffersModel from '../models/product-offers';
import DayCounterModel from '../models/day-counter.model';
import { getCounterProjection, Counter } from "../shared/counter";
import { DbConnectionAsinScannerNA } from "../shared/dbConnectionAsinScannerNA";

export interface TotalCounter extends Counter { }

export interface DayCounter extends TotalCounter {
  date: string;
}

export class CounterService {
  @DbConnectionAsinScannerNA()
  async getDayCounter(startDate: Date, endDate: Date) {
    const dayCounter = await DayCounterModel.aggregate<DayCounter>([
      { $match: { date: { $gte: startDate, $lt: endDate } } },
      { $sort: { date: 1 } },
      {
        $project: {
          ...getCounterProjection(),
          date: true,
        },
      },
    ]).exec();

    return dayCounter;
  }

  @DbConnectionAsinScannerNA()
  async getTotalCounter() {
    const totalCompetitiveSummary = await CompetitiveSummaryModel.countDocuments();
    const totalCategoryItem = await CatalogItemModel.countDocuments();
    const totalProductOffers = await ProductOffersModel.countDocuments();
    const totalAsin = await AsinCollectionModel.countDocuments();


    return  [{
      asin: totalAsin,
      catalogItem: totalCategoryItem,
      competitiveSummary: totalCompetitiveSummary,
      productOffers: totalProductOffers
    }];
  }
}
