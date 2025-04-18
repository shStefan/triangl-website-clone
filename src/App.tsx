import { Routes, Route } from 'react-router-dom';
import { HomePage } from './screens/HomePage';
import { CataloguePage } from './screens/CataloguePage';
import { ProductPage } from './screens/ProductPage';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App; 