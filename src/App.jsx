import { useState } from "react";
import useGetExample from "./api/getExample";

function App() {
  const [count, setCount] = useState(0);
  const test = import.meta.env.VITE_LOCAL_API_URL;

  const { data, error, loading } = useGetExample();

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Hello World</p>
      </header>
    </div>
  );
}

export default App;
