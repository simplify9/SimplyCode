import { Routes, Route, Link } from 'react-router-dom';
import { ContentArea } from './components/controls/ContentArea';
import { NavBar } from './components/NavBar';
import { AddType } from './components/routes/AddType';
import { ModelView } from './components/routes/ModelView';
import { TypeView } from './components/routes/TypeView';
import { SideArea } from './components/controls/SideArea';
import { TypeBrowser } from './components/TypeBrowser';

function App() {
  return (
    
      <div className="App">
        <NavBar />
        <SideArea>
          <div className='flex justify-between items-center w-full bg-blue-900'>
            <div className='px-4 text-white py-2 text-lg font-bold'>App Data Model</div>
          </div>
          <div className='flex justify-between items-center w-full bg-blue-700'>
            <div className='px-4 text-white py-2'>Types</div>
            <Link to='/add_type' className='text-white bg-blue-500 py-2 px-4 font-light'>Add New</Link>
          </div>
          <TypeBrowser />
        </SideArea>
        <ContentArea>
          <Routes>
            <Route path='/add_type' element={<AddType />} />
            <Route path='/types/:name' element={<TypeView />} />
            <Route path='/' element={<ModelView />} />
          </Routes>
        </ContentArea>
      </div>
    
  );
}

export default App;
