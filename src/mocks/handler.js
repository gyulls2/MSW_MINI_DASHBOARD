import { rest } from "msw";
import timeseriesDataGet from "./resolver/timeseries";
import { pieResolver } from "./resolver/pie";
import { valueResolver } from "./resolver/value";
const chartHandlers = [
  rest.get("/timeseries", timeseriesDataGet),
  rest.get("/pie", pieResolver),
  rest.get("/value", valueResolver),
];

export const handlers = [...chartHandlers];
