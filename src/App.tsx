import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Students from "./pages/Students";
import NovoAluno from "./pages/cadastros/alunos/NovoAluno";
import ListaAlunos from "./pages/cadastros/alunos/ListaAlunos";
import HistoricoAluno from "./pages/cadastros/alunos/HistoricoAluno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/students" element={<Students />} />
        <Route path="/cadastros/alunos/novo" element={<NovoAluno />} />
        <Route path="/cadastros/alunos/lista" element={<ListaAlunos />} />
        <Route path="/cadastros/alunos/:id/historico" element={<HistoricoAluno />} />
      </Routes>
    </Router>
  );
}

export default App;