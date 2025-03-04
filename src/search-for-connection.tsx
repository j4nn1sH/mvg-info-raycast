import { SetStateAction, useState } from "react";
import { Journey, Station } from "./mvg";
import { Action, ActionPanel, List } from "@raycast/api";
import { MVG_API_URL } from "./config";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  console.log(from);
  console.log(to);

  const shouldFetchJourneys = !!from && !!to;
  const { data, isLoading } = useFetch<Journey[]>(
    shouldFetchJourneys
      ? `${MVG_API_URL}/routes?originStationGlobalId=${from}&destinationStationGlobalId=${to}&routingDateTimeIsArrival=false&transportTypes=SCHIFF,RUFTAXI,UBAHN,TRAM,SBAHN,BUS,REGIONAL_BUS,BAHN`
      : "",
    {
      keepPreviousData: true,
      execute: shouldFetchJourneys,
    },
  );
  const journeys = data || [];

  console.log(
    `${MVG_API_URL}/routes?originStationGlobalId=${from}&destinationStationGlobalId=${to}&routingDateTimeIsArrival=false&transportTypes=SCHIFF,RUFTAXI,UBAHN,TRAM,SBAHN,BUS,REGIONAL_BUS,BAHN`,
  );

  return (
    <SearchForStation
      title="From..."
      setValue={setFrom}
      nextView={
        <SearchForStation
          title="To..."
          setValue={setTo}
          nextView={
            <List isLoading={isLoading}>
              {journeys.length > 0 ? (
                journeys.map((journey, index) => (
                  <List.Item
                    key={index}
                    title={`Journey ${index + 1}`}
                    subtitle={`Distance: ${journey.distance} km`}
                    detail={
                      <List.Item.Detail markdown="![Illustration](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png)" />
                    }
                  />
                ))
              ) : (
                <List.EmptyView title="No journeys found" description="Try another station" />
              )}
            </List>
          }
        />
      }
    />
  );
}

type Props = {
  title: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  nextView: JSX.Element;
};

function SearchForStation({ title, setValue, nextView }: Props) {
  const [searchText, setSearchText] = useState("");
  const shouldSearch = searchText.length >= 3;
  const { data } = useFetch<Station[]>(
    shouldSearch ? `${MVG_API_URL}/locations?locationTypes=STATION&query=${encodeURIComponent(searchText)}` : "",
    { keepPreviousData: true, execute: shouldSearch },
  );

  const searchedStations = data || [];

  return (
    <List searchText={searchText} onSearchTextChange={setSearchText} searchBarPlaceholder={title}>
      {searchedStations.map((station) => (
        <List.Item
          key={station.globalId}
          title={station.name}
          actions={
            <ActionPanel>
              <Action.Push title="Enter" target={nextView} onPush={() => setValue(station.globalId)}></Action.Push>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
