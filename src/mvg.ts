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
  // ticketingInformation: TicketingInformation;
  distance: number;
  // bannerHash: string;
  // refreshId: string;
};

export type JourneyPart = {
  from: Station;
  to: Station;
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
