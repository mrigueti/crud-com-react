import './App.css';

//Importar o bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importar o gerenciador de rotas
import { BrowserRouter, Route, Routes} from "react-router-dom"

//Importar paginas
import Produtos from "./pages/Produtos.jsx"
import Login from "./pages/Login.jsx"
import CadastroProdutos from "./pages/CadastroProdutos.jsx"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />         
          <Route path='/produtos' element={<Produtos />} />
          <Route path='/cadastro' element={<CadastroProdutos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;