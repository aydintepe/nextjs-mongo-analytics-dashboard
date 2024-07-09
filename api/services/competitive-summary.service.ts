import CompetitiveSummaryModel from "../models/competitive-summary";
import { DbConnectionAU } from "../shared/dbConnectionAU";
import { DbConnectionJP } from "../shared/dbConnectionJP";
import { DbConnectionUK } from "../shared/dbConnectionUK";
import { DbConnectionUS } from "../shared/dbConnectionUS";
import axios from "axios";


export interface CompetitiveSummary {
  _id: string
  createdAt: CreatedAt
  updatedAt: UpdatedAt
  marketplaceId: string
  Identifier: Identifier
  ASIN: string
  Summary: Summary
  Offers: Offer[]
  status: string
  ItemCondition: string
}

export interface Id {
  $oid: string
}

export interface CreatedAt {
  $date: string
}

export interface UpdatedAt {
  $date: string
}

export interface Identifier {
  ASIN: string
  MarketplaceId: string
  ItemCondition: string
}

export interface Summary {
  BuyBoxEligibleOffers: BuyBoxEligibleOffer[]
  LowestPrices: LowestPrice[]
  BuyBoxPrices: BuyBoxPrice[]
  CompetitivePriceThreshold: CompetitivePriceThreshold
  NumberOfOffers: NumberOfOffer[]
  ListPrice: ListPrice
  TotalOfferCount: number
  SalesRankings: SalesRanking[]
}

export interface BuyBoxEligibleOffer {
  condition: string
  fulfillmentChannel: string
  OfferCount: number
}

export interface LowestPrice {
  condition: string
  fulfillmentChannel: string
  LandedPrice: LandedPrice
  Shipping: Shipping
  ListingPrice: ListingPrice
}

export interface LandedPrice {
  CurrencyCode: string
  Amount: number
}

export interface Shipping {
  CurrencyCode: string
  Amount: number
}

export interface ListingPrice {
  CurrencyCode: string
  Amount: number
}

export interface BuyBoxPrice {
  condition: string
  LandedPrice: LandedPrice2
  Shipping: Shipping2
  sellerId: string
  ListingPrice: ListingPrice2
}

export interface LandedPrice2 {
  CurrencyCode: string
  Amount: number
}

export interface Shipping2 {
  CurrencyCode: string
  Amount: number
}

export interface ListingPrice2 {
  CurrencyCode: string
  Amount: number
}

export interface CompetitivePriceThreshold {
  CurrencyCode: string
  Amount: number
}

export interface NumberOfOffer {
  condition: string
  fulfillmentChannel: string
  OfferCount: number
}

export interface ListPrice {
  CurrencyCode: string
  Amount: number
}

export interface SalesRanking {
  Rank: number
  ProductCategoryId: string
}

export interface Offer {
  ShippingTime: ShippingTime
  IsFulfilledByAmazon: boolean
  ListingPrice: ListingPrice3
  IsBuyBoxWinner: boolean
  SellerId: string
  Shipping: Shipping3
  SubCondition: string
  IsFeaturedMerchant: boolean
  SellerFeedbackRating: SellerFeedbackRating
  PrimeInformation: PrimeInformation
  ShipsFrom?: ShipsFrom
}

export interface ShippingTime {
  minimumHours: number
  maximumHours: number
  availabilityType: string
}

export interface ListingPrice3 {
  CurrencyCode: string
  Amount: number
}

export interface Shipping3 {
  CurrencyCode: string
  Amount: number
}

export interface SellerFeedbackRating {
  FeedbackCount: number
  SellerPositiveFeedbackRating: number
}

export interface PrimeInformation {
  IsPrime: boolean
  IsNationalPrime: boolean
}

export interface ShipsFrom {
  Country: string
}



export class CompetitiveSummaryService {
  @DbConnectionAU()
  async getCompetitiveSummaryAU(
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    page?: number,
    sortBy?: string,
    sortOrder?: string,
    asin?: string
  ): Promise<CompetitiveSummary[]> {
    const currency = await axios.get(`https://api.exchangerate-api.com/v4/latest/AUD`)
    const exchangeRate = currency?.data?.rates["USD"];
    let competitiveSummary;
    if (asin != null) {
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        }
      ])
    } else if (sortBy && sortOrder != null) {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        },
        {
          $sort: sortOptions
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    } else {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    }

    return competitiveSummary;
  }

  @DbConnectionJP()
  async getCompetitiveSummaryJP(
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    page?: number,
    sortBy?: string,
    sortOrder?: string,
    asin?: string
  ): Promise<CompetitiveSummary[]> {
    const currency = await axios.get(`https://api.exchangerate-api.com/v4/latest/JPY`)
    const exchangeRate = currency?.data?.rates["USD"];
    let competitiveSummary;
    if (asin != null) {
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        }
      ])

    } else if (sortBy && sortOrder != null) {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        },
        {
          $sort: sortOptions
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    } else {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])

    }
    return competitiveSummary;
  }

  @DbConnectionUK()
  async getCompetitiveSummaryUK(
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    page?: number,
    sortBy?: string,
    sortOrder?: string,
    asin?: string
  ): Promise<CompetitiveSummary[]> {
    let competitiveSummary;
    const currency = await axios.get(`https://api.exchangerate-api.com/v4/latest/GBP`)
    const exchangeRate = currency?.data?.rates["USD"];

    if (asin != null) {
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        }
      ])
    } else if (sortBy && sortOrder != null) {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        },
        {
          $sort: sortOptions
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    } else {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      competitiveSummary = await CompetitiveSummaryModel.aggregate([
        {
          $match: {
            ASIN: { $ne: null }
          }
        },
        {
          $addFields: {
            USD_price: { $multiply: ["$AUD_price", exchangeRate] }
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ])
    }
    return competitiveSummary;
  }

  @DbConnectionUS()
  async getCompetitiveSummaryUS(
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    page?: number,
    sortBy?: string,
    sortOrder?: string,
    asin?: string
  ): Promise<CompetitiveSummary[]> {
    let competitiveSummary;
    if (asin != null) {
      competitiveSummary = await CompetitiveSummaryModel.find({ ASIN: asin })
    } else if (sortBy && sortOrder != null) {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
      competitiveSummary = await CompetitiveSummaryModel.find({ ASIN: { $ne: null } })
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
    } else {
      if (!page) page = 1;
      if (!limit) limit = 100;
      const skip = (page - 1) * limit;
      competitiveSummary = await CompetitiveSummaryModel.find({ ASIN: { $ne: null } })
        .skip(skip)
        .limit(limit)
    }
    return competitiveSummary;
  }
}
