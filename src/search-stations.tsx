import { ActionPanel, List, Action, Icon } from "@raycast/api";
import { useFetch, useLocalStorage } from "@raycast/utils";
import { useState } from "react";

import { MVG_API_URL } from "./config";
import { Station } from "./mvg";
import UpcomingDepartures from "./upcoming-depatures";

type ShortStation = {
  globalId: string;
  name: string;
};

export default function Command() {
  const { value: pinnedStations = [], setValue: setPinnedStations } = useLocalStorage<ShortStation[]>(
    "pinnedStations",
    [],
  );

  const [searchText, setSearchText] = useState("");
  const shouldSearch = searchText.length >= 3;
  const { data, isLoading } = useFetch<Station[]>(
    shouldSearch ? `${MVG_API_URL}/locations?locationTypes=STATION&query=${encodeURIComponent(searchText)}` : "",
    { keepPreviousData: true, execute: shouldSearch },
  );

  // Filter out pinned stations from search results
  const searchedStations = (data || []).filter(
    (station) => !pinnedStations.some((pinned) => pinned.globalId === station.globalId),
  );

  // Toggle pinning logic
  const togglePin = (station: ShortStation) => {
    const isPinned = pinnedStations.some((p) => p.globalId === station.globalId);
    const updatedPins = isPinned
      ? pinnedStations.filter((p) => p.globalId !== station.globalId) // Remove from pinned
      : [...pinnedStations, station]; // Add to pinned

    setPinnedStations(updatedPins);
  };

  return (
    <List isLoading={isLoading} searchText={searchText} onSearchTextChange={setSearchText} throttle>
      {/* Pinned Stations Section */}
      {pinnedStations.length > 0 && (
        <List.Section title="Pinned">
          {pinnedStations.map((station) => (
            <List.Item
              key={station.globalId}
              // icon={Icon.Building}
              title={station.name}
              actions={
                <ActionPanel>
                  <Action.Push
                    icon={Icon.Train}
                    title="Show Departures"
                    target={<UpcomingDepartures stationGlobalId={station.globalId} limit={10} />}
                  />
                  <Action title="Unpin Station" onAction={() => togglePin(station)} icon={Icon.MinusCircle} />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      {/* Search Results Section */}
      {shouldSearch && searchedStations.length > 0 && (
        <List.Section title="Search...">
          {searchedStations.map((station) => (
            <List.Item
              key={station.globalId}
              // icon={Icon.Building}
              title={station.name}
              actions={
                <ActionPanel>
                  <Action.Push
                    title="Show Departures"
                    target={<UpcomingDepartures stationGlobalId={station.globalId} limit={6} />}
                  />
                  <Action
                    title="Pin Station"
                    onAction={() => togglePin({ globalId: station.globalId, name: station.name })}
                    icon={Icon.Pin}
                  />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      )}

      {/* Show message when no pinned stations & no search */}
      {pinnedStations.length === 0 && !shouldSearch && (
        <List.EmptyView title="No pinned stations. Search to add some!" />
      )}
    </List>
  );
}
