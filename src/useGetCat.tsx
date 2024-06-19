import { useEffect, useState } from "react";

export const useGetCat = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getUrl = async () => {
    setUrl(null);
    setError(null);

    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const json = await response.json();

    if (response.ok) {
      setUrl(json[0].url);
    } else {
      setError(`Error: ${json.message}`);
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  return {
    url,
    error,
    getCat: getUrl,
  };
};
