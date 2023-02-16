import { Routes, Route } from 'react-router-dom';
import { ContentArea } from './components/ContentArea';
import { NavBar } from './components/NavBar';
import { TypeView } from './components/routes/TypeView';
import { SideArea } from './components/SideArea';
import { TypeBrowser } from './components/TypeBrowser';

function App() {
  return (
    
      <div className="App">
        <NavBar />
        <SideArea>
          <TypeBrowser />
        </SideArea>
        <ContentArea>
          <Routes>
            <Route path='/types/:name' element={<TypeView />} />

          </Routes>
        </ContentArea>
      </div>
    
  );
}

export default App;
