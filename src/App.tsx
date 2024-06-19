import "./App.css";
import { useGetCat } from "./useGetCat";

function App() {
  const { url, error, getCat } = useGetCat();

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "800px" }}>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : url ? (
        <img src={url} alt="cat image" />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={getCat}>Get cat</button>
    </div>
  );
}

export default App;
