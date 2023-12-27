import { useEffect, useState } from "react";

export default function useSearch(query: string) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await (
          await fetch(
            "https://xeno-canto.org/api/2/recordings?query=cnt:brazil"
          )
        ).json();
        console.log(resp);
        setResults(resp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [query]);

  return results;
}
