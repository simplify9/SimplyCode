import { NavBar } from './components/NavBar';
import { TypeBrowser } from './components/TypeBrowser';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className='flex w-full'>
        <TypeBrowser />
      </div>
    </div>
  );
}

export default App;
