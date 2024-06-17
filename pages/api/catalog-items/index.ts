import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ParseNumberPipe,
} from "next-api-decorators";

import { CatalogItem, CatalogItemsService } from "@/api/services/catalog-items.service";


export type CatalogItemsResponse = { catalogItems: CatalogItem[] };

class CatalogItemsHandler {
  private catalogItemsService = new CatalogItemsService();

  @Get()
  async getAsinCollections(
    @Query("startDate", ParseDatePipe) startDate: Date,
    @Query("endDate", ParseDatePipe) endDate: Date,
    @Query("limit", ParseNumberPipe) limit: number
  ): Promise<CatalogItemsResponse> {
    const catalogItems = await this.catalogItemsService.getCatalogItems(
      startDate,
      endDate,
      limit
    );

    return { catalogItems };
  }
}

export default createHandler(CatalogItemsHandler);
