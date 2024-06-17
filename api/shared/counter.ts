export interface Counter {
  asin: any;
  catalogItem: any;
  competitiveSummary: any;
  productOffers: any;
}

export interface DayCounterResponse<T> {
  dayCounter: T[];
}
export interface TotalCounterResponse<T> {
  totalCounter: T[];
}

export function getCounterProjection() {
  return {
    _id: false,
    asin: true,
    catalogItem: true,
    competitiveSummary: true,
    productOffers:true
  };
}
