import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ParseNumberPipe,
} from "next-api-decorators";

import { CatalogItem, CatalogItemsService } from "@/api/services/catalog-items-au.service";


export type CatalogItemsResponse = { catalogItems: CatalogItem[] };

class CatalogItemsHandler {
  private catalogItemsService = new CatalogItemsService();

  @Get()
  async getAsinCollections(
    @Query("startDate", ParseDatePipe({ nullable: true })) startDate?: Date,
    @Query("endDate", ParseDatePipe({ nullable: true })) endDate?: Date,
    @Query("limit", ParseNumberPipe({ nullable: true })) limit?: number,
    @Query("page", ParseNumberPipe({ nullable: true })) page?: number,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder?: string,
    @Query("asin") asin?: string,
  ): Promise<CatalogItemsResponse> {
    const catalogItems = await this.catalogItemsService.getCatalogItems(
      startDate,
      endDate,
      limit,
      page,
      sortBy,
      sortOrder,
      asin
    );

    return { catalogItems };
  }
}

export default createHandler(CatalogItemsHandler);
