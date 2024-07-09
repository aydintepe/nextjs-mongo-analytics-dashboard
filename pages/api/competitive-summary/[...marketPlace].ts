import {
  createHandler,
  Get,
  Query,
  ParseDatePipe,
  ParseNumberPipe,
  Param,
} from "next-api-decorators";
import { useRouter } from 'next/router'
import { CompetitiveSummary, CompetitiveSummaryService } from "@/api/services/competitive-summary.service";
export type CompetitiveSummaryResponse = { competitiveSummaries: CompetitiveSummary[] };
class CompetitiveSummariesHandler {
  private competitiveSummariesService = new CompetitiveSummaryService();

  @Get()
  async getCompetitiveSummaries(
    @Query('marketPlace') marketPlace: string,
    @Query("startDate", ParseDatePipe({ nullable: true })) startDate?: Date,
    @Query("endDate", ParseDatePipe({ nullable: true })) endDate?: Date,
    @Query("limit", ParseNumberPipe({ nullable: true })) limit?: number,
    @Query("page", ParseNumberPipe({ nullable: true })) page?: number,
    @Query("sortBy") sortBy?: string,
    @Query("sortOrder") sortOrder?: string,
    @Query("asin") asin?: string,
  ): Promise<CompetitiveSummaryResponse> {
    console.log("Market Place Name => ", marketPlace[0]);
    let competitiveSummaries;

    if (marketPlace[0] == "au") {
      competitiveSummaries = await this.competitiveSummariesService.getCompetitiveSummaryAU(
        startDate,
        endDate,
        limit,
        page,
        sortBy,
        sortOrder,
        asin
      );
    } else if (marketPlace[0] == "jp") {
      competitiveSummaries = await this.competitiveSummariesService.getCompetitiveSummaryJP(
        startDate,
        endDate,
        limit,
        page,
        sortBy,
        sortOrder,
        asin
      );
    } else if (marketPlace[0] == "uk") {
      competitiveSummaries = await this.competitiveSummariesService.getCompetitiveSummaryUK(
        startDate,
        endDate,
        limit,
        page,
        sortBy,
        sortOrder,
        asin
      );
    } else if (marketPlace[0] == "us") {
      competitiveSummaries = await this.competitiveSummariesService.getCompetitiveSummaryUS(
        startDate,
        endDate,
        limit,
        page,
        sortBy,
        sortOrder,
        asin
      );
    }
    return { competitiveSummaries };
  }
}

export default createHandler(CompetitiveSummariesHandler);
