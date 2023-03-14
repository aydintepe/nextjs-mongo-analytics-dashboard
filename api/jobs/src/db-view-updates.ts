import { Agenda } from "@hokify/agenda";

import dbConnection from "../../utils/dbConnection";
import { calculateDayStats } from "../../models/day-stats.model";

const JOB_NAMES = {
  CALCULATE_DAY_STATS: "CALCULATE_DAY_STATS",
};

export default async function scheduleDbViewUpdates(agenda: Agenda) {
  agenda.define(JOB_NAMES.CALCULATE_DAY_STATS, async (job) => {
    const connection = await dbConnection();

    await calculateDayStats();

    connection.disconnect();
  });
  await agenda.every("1 day", JOB_NAMES.CALCULATE_DAY_STATS);
}
