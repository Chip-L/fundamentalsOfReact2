import { useEffect, useState } from "react";

export const useGetCat = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUrl = async () => {
    setIsLoading(true);
    setUrl(null);
    setError(null);

    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const json = await response.json();

    if (response.ok) {
      setUrl(json[0].url);
      setIsLoading(false);
    } else {
      setError(`Error: ${json.message}`);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUrl();
  }, []);

  return {
    url,
    isLoading,
    error,
    getCat: getUrl,
  };
};
