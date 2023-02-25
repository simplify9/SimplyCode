import { Routes, Route, Link } from 'react-router-dom';
import { ContentArea } from './components/controls/ContentArea';
import { NavBar } from './components/NavBar';
import { AddType } from './components/routes/AddType';
import { ModelView } from './components/routes/ModelView';
import { TypeView } from './components/routes/TypeView';
import { SideArea } from './components/controls/SideArea';
import { TypesPanel } from './components/TypesPanel';
import { ModelPanel } from './components/ModelPanel';
import { TypeViewSpecs } from './components/routes/TypeViewSpecs';

function App() {
  return (
    
      <div className="App">
        <NavBar />
        <SideArea>
          <ModelPanel />
          <TypesPanel />
        </SideArea>
        <ContentArea>
          <Routes>
            <Route index element={<ModelView />} />
            <Route path='add_type' element={<AddType />} />
            <Route path='types/:name' element={<TypeView />}>
              <Route index element={<TypeViewSpecs />} />
            </Route>
          </Routes>
        </ContentArea>
      </div>
    
  );
}

export default App;
