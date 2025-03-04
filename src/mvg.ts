export type TransportType = "UBAHN" | "BUS" | "TRAM" | string;

export type Departure = {
  plannedDepartureTime: number;
  realtime: boolean;
  delayInMinutes: number;
  realtimeDepartureTime: number;
  transportType: TransportType;
  label: string;
  divaId: string;
  network: string;
  trainType: string;
  destination: string;
  cancelled: boolean;
  sev: boolean;
  platform: number;
  platformChanged: boolean;
  messages: string[];
  infos: string[];
  bannerHash: string;
  occupancy: "LOW" | "MEDIUM" | "HIGH" | string;
  stopPointGlobalId: string;
  lineId: string;
};

export const LINE_COLORS: Record<string, string> = {
  U1: "#52822F",
  U2: "#C20831",
  U3: "#EC6726",
  U4: "#00A984",
  U5: "#BC7A00",
  U6: "#0065AE",
};

export type Station = {
  type: "STATION";
  latitude: number;
  longitude: number;
  place: string;
  name: string;
  globalId: string;
  divaId: number;
  hasZoomData: boolean;
  transportTypes: TransportType[];
  aliases: string;
  tariffZones: string;
};

export type Journey = {
  uniqueId: number;
  parts: JourneyPart[];
  ticketingInformation: TicketingInformation;
  distance: number;
  bannerHash: string;
  refreshId: string;
};

export type Step = {
  latitude: number;
  longitude: number;
  stationGlobalId: string;
  stationDivaId: number;
  platform: number;
  platformChanged: boolean;
  place: string;
  name: string;
  plannedDeparture: Date;
  transportTypes: TransportType[];
  isViaStop: boolean;
  surroundingPlanLink: string;
  occupancy: Occupancy;
  hasZoomData: boolean;
  hasOutOfOrderEscalator: boolean;
  hasOutOfOrderElevator: boolean;
};

export type JourneyPart = {
  from: Step;
  to: Step;
  intermediateStops: Station[];
  noChangeRequired: boolean;
  line: TransportLine;
  pathPolyline: string;
  interchangePathPolyline?: string;
  pathDescription?: string[];
  exitLetter?: string;
  distance: number;
  occupancy: Occupancy;
  messages: string[];
  infos: string[];
  realTime: boolean;
};

export type TransportLine = {
  label: string;
  transportType: TransportType;
  destination: string;
  trainType: string;
  network: string;
  divaId: string;
  sev: boolean; // Indicates replacement service
};

export type TicketingInformation = {
  zones: number[];
  alternativeZones: number[];
  unifiedTicketIds: string[];
};

export type Occupancy = "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";

// {
//   uniqueId: -38887610348421443,
//   parts: [
//     {
//       from: {
//         latitude: 48.203075,
//         longitude: 11.613016,
//         stationGlobalId: "de:09162:430",
//         stationDivaId: 430,
//         platform: 2,
//         platformChanged: false,
//         place: "München",
//         name: "Kieferngarten",
//         plannedDeparture: "2025-03-04T18:56:18+01:00",
//         transportTypes: ["UBAHN", "BUS"],
//         isViaStop: false,
//         surroundingPlanLink: "",
//         occupancy: "UNKNOWN",
//         hasZoomData: true,
//         hasOutOfOrderEscalator: false,
//         hasOutOfOrderElevator: false,
//       },
//       to: {
//         latitude: 48.191961,
//         longitude: 11.614291,
//         stationGlobalId: "de:09162:420",
//         stationDivaId: 420,
//         platform: 2,
//         platformChanged: false,
//         place: "München",
//         name: "Freimann",
//         plannedDeparture: "2025-03-04T18:58:00+01:00",
//         transportTypes: ["UBAHN"],
//         isViaStop: false,
//         surroundingPlanLink: "",
//         occupancy: "UNKNOWN",
//         hasZoomData: true,
//         hasOutOfOrderEscalator: false,
//         hasOutOfOrderElevator: false,
//       },
//       intermediateStops: [],
//       noChangeRequired: false,
//       line: {
//         label: "U6",
//         transportType: "UBAHN",
//         destination: "Goetheplatz",
//         trainType: "",
//         network: "swm",
//         divaId: "010U6",
//         sev: false,
//       },
//       pathPolyline:
//         "gyeeHyd{eAr@Np@LbAJxAHjABTAn@CjAI`@GZGZId@M`@ORIbAk@TQd@]\\]b@g@^g@bC{DV[p@q@VUXWn@a@lAi@`@M`@I`@Gp@Gp@?~@D~@Lh@Lb@NnLtEj@Th@ZtBnAx@f@DB",
//       interchangePathPolyline: "",
//       pathDescription: [],
//       exitLetter: "",
//       distance: 1425.788061044182,
//       occupancy: "UNKNOWN",
//       messages: [],
//       infos: [],
//       realTime: true,
//     },
//   ],
//   ticketingInformation: {
//     zones: [0],
//     alternativeZones: [1],
//     unifiedTicketIds: [
//       "9996",
//       "9996",
//       "9994",
//       "9996",
//       "9993",
//       "9993",
//       "9994",
//       "9994",
//       "9998",
//       "9999",
//       "9999",
//       "9999",
//       "9999",
//       "9999",
//       "KURZE",
//       "EINK",
//       "STK-E-K",
//       "STK-K-1",
//       "STKU21-2",
//       "TKS-M0",
//       "TKG-M0",
//       "TKK",
//       "TKF",
//       "ICW-10",
//       "ICW-M0",
//       "ICM-10",
//       "ICM-M0",
//       "ICMA-10",
//       "ICMA-M0",
//       "ICJA-10",
//       "ICJA-M0",
//       "IC9-10",
//       "IC9-M0",
//       "IC9MA-10",
//       "IC9MA-M0",
//       "IC9JA-10",
//       "IC9JA-M0",
//       "IC65-10",
//       "IC65-M0",
//       "IC65MA-10",
//       "IC65MA-M0",
//       "IC65JA-10",
//       "IC65JA-M0",
//       "AT1W-10",
//       "AT1W-M0",
//       "AT1M-10",
//       "AT1M-M0",
//       "AT2W-10",
//       "AT2W-M0",
//       "AT2M-10",
//       "AT2M-M0",
//       "APC1-10",
//       "APC1-M0",
//       "APC2-10",
//       "APC2-M0",
//       "ICS-10",
//       "ICS-M0",
//       "BT-21",
//       "BT-22",
//       "BT-23",
//       "BT-24",
//       "BT-25",
//       "BT-11",
//       "BT-12",
//       "BT-13",
//       "BT-14",
//       "BT-15",
//       "BTN-21",
//       "BTN-22",
//       "BTN-23",
//       "BTN-24",
//       "BTN-25",
//       "BTN-11",
//       "BTN-12",
//       "BTN-13",
//       "BTN-14",
//       "BTN-15",
//       "E365J-10",
//       "E365J-M0",
//       "E365M-10",
//       "E365M-M0",
//     ],
//   },
//   distance: 1425.788061044182,
//   bannerHash: "",
//   refreshId:
//     "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",
// },
