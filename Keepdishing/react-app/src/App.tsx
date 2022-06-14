import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { useGetWeatherForecastQuery } from './store/api/api'

function App() {
  const [count, setCount] = useState(0)

  const {data} = useGetWeatherForecastQuery();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count} WOW
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
         {JSON.stringify(data)}
        </p>
      </header>
    </div>
  )
}

export default App
