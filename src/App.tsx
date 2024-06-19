import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUrl = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const json = await response.json();

    if (response.ok) {
      setUrl(json[0].url);
    } else {
      setError(`Error: ${json.message}`);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUrl();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "800px" }}>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            url && <img src={url} alt="cat image" />
          )}
        </>
      )}
      <button onClick={() => getUrl()}>Get cat</button>
    </div>
  );
}

export default App;
