import { useEffect, useMemo, useState } from "react";
import MarketItem from "./marketItem";
import styled from "styled-components";

const ResultsContainer = styled.div`
  position: absolute;
  width: 400px;
  background: white;
  border: solid 1px #222;
  border-top: solid 1px transparent;
  margin-top: -3px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
`;

const Results = ({ items, onItemSelected, query, onResultsCalculated }) => {
  const [results, setResults] = useState([]);
  const filteredItems = useMemo(() => findMatch(items, query), [items, query]);

  useEffect(() => {
    onResultsCalculated(results);
  }, [results]);

  function findMatch() {
    const res = items.filter((i) => {
      return i.title.toLowerCase().indexOf(query) >= 0 && query.length > 0;
    });

    setResults(res);
    return res;
  }

  return (
    <ResultsContainer>
      {query !== ""
        ? filteredItems.map((item) => (
            <MarketItem
              key={item.id}
              item={item}
              query={query}
              onClick={onItemSelected}
            />
          ))
        : ""}
    </ResultsContainer>
  );
};

export default Results;
