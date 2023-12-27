import { useEffect, useState } from "react";

function useGeo() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {}, [searchTerm]);

  return [setSearchTerm, results];
}
