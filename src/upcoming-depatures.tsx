import { ActionPanel, List, Action, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";

import { MVG_API_URL } from "./config";
import { Departure, LINE_COLORS } from "./mvg";
import { useMemo } from "react";

type Props = {
  stationGlobalId: string;
  limit: number;
};

export default function UpcomingDepartures({ stationGlobalId, limit = 5 }: Props) {
  const { data } = useFetch<Departure[]>(
    MVG_API_URL + `/departures?globalId=${stationGlobalId}&limit=${limit}&transportTypes=UBAHN`,
  );

  const departures = useMemo(() => {
    return (data || []).sort((a, b) => a.realtimeDepartureTime - b.realtimeDepartureTime);
  }, [data]);

  return (
    <List>
      {departures.map((departure, index) => {
        const departureTime = new Date(departure.realtimeDepartureTime);
        const minutesUntilDeparture = Math.round((departure.realtimeDepartureTime - Date.now()) / 60000);

        return (
          <List.Item
            key={index}
            icon={{ source: Icon.Circle, tintColor: LINE_COLORS[departure.label] || "#888888" }}
            title={`${departure.label} → ${departure.destination}`}
            subtitle={`Platform ${departure.platform}`}
            accessories={[
              { icon: Icon.Clock, text: minutesUntilDeparture < 2 ? "Now" : `${minutesUntilDeparture} min` },
            ]}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard
                  content={`${departure.label} to ${departure.destination} at ${departureTime.getHours().toString().padStart(2, "0")}:${departureTime.getMinutes().toString().padStart(2, "0")}`}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
