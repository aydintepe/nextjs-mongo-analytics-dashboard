import { DbConnectionUS } from "../shared/dbConnectionUS";
import CatalogItemModel from "../models/catalog-item";

export interface CatalogItem {
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



export class CatalogItemsService {
  @DbConnectionUS()
  async getCatalogItems(
    startDate?: Date,
    endDate?: Date,
    limit?: number,
    page?: number,
    sortBy?: string,
    sortOrder?: string,
    asin?: string
  ): Promise<CatalogItem[]> {
    let catalogItems;
    if (asin != null) {

      catalogItems = await CatalogItemModel.find({asin:asin})
    } else if (sortBy && sortOrder != null) {
      if(!page) page = 1;
      if(!limit) limit = 100;
      const skip = (page - 1) * limit;
      const sortOptions: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
      console.log(sortOptions)
      catalogItems = await CatalogItemModel.find({asin: { $ne: null }})
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
    } else {
      if(!page) page = 1;
      if(!limit) limit = 100;
      const skip = (page - 1) * limit;
      catalogItems = await CatalogItemModel.find({asin: { $ne: null }})
        .skip(skip)
        .limit(limit)
    }
    return catalogItems;
  }
}
