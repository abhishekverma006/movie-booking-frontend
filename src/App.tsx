import { useEffect } from "react";
import { getHealth } from "./services/api/endpoints/healthApi";

function App() {
  useEffect(() => {
    const testApi = async () => {
      try {
        const data = await getHealth();
        console.log("Backend health:", data);
      } catch (error) {
        console.error("Backend request failed:", error);
      }
    };
    void testApi();
  }, []);
  return <h1>Movie Booking App</h1>;
}

export default App;
