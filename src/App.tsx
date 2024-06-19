import "./App.css";
import { useGetCat } from "./useGetCat";

function App() {
  const { url, isLoading, error, getCat } = useGetCat();

  return (
    <div className="container">
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : url && !isLoading ? (
        <img src={url} alt="cat image" />
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={getCat}>Get cat</button>
    </div>
  );
}

export default App;
