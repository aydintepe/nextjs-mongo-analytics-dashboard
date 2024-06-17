import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ParseNumberPipe,
} from "next-api-decorators";

import { Asin, AsinCollectionService } from "@/api/services/asin-collections.service";

export type AsinCollectionsResponse = { asinCollections: Asin[] };

class AsinCollectionHandler {
  private asinCollectionService = new AsinCollectionService();

  @Get()
  async getAsinCollections(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("limit", ParseNumberPipe) limit: number
  ): Promise<AsinCollectionsResponse> {
    const asinCollections = await this.asinCollectionService.getAsinCollections(
      startDate,
      endDate,
      limit
    );

    return { asinCollections };
  }
}

export default createHandler(AsinCollectionHandler);
