import './App.css'
import GenRand from './components/GenerateRand';
import GenSpecific from './components/GenerateVerse';

const App = () => {

  return (
    <div className="app">
      <div className="container">
        <h1>API Project</h1>
          <GenRand />
          <GenSpecific />
      </div>
    </div>
  )
}

export default App
