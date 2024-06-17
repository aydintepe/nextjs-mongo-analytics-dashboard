import { createHandler, Get, Query, ParseDatePipe } from "next-api-decorators";

import {
  DayCounter,
  CounterService,
  TotalCounter,
} from "@/api/services/counter.service";
import {
  DayCounterResponse as DayCounterResponseGeneric,
  TotalCounterResponse as TotalCounterResponseGeneric,
} from "@/api/shared/counter";

export type DayCounterResponse = DayCounterResponseGeneric<DayCounter>;
export type TotalCounterResponse = TotalCounterResponseGeneric<TotalCounter>;

class CounterHandler {
  private CounterService = new CounterService();

  @Get("/day")
  async getDayCounter(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<DayCounterResponse> {
    const dayCounter = await this.CounterService.getDayCounter(startDate, endDate);

    return { dayCounter };
  }

  @Get("/total")
  async getTotalCounter(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date
  ): Promise<TotalCounterResponse> {
    const totalCounter = await this.CounterService.getTotalCounter();
    return { totalCounter };
  }
}

export default createHandler(CounterHandler);
