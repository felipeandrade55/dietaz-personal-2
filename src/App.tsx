import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Students from "./pages/Students";
import NovoAluno from "./pages/cadastros/alunos/NovoAluno";
import ListaAlunos from "./pages/cadastros/alunos/ListaAlunos";
import HistoricoAluno from "./pages/cadastros/alunos/HistoricoAluno";
import Plans from "./pages/Plans";
import PayablesList from "./pages/finance/payables/PayablesList";
import NewPayable from "./pages/finance/payables/NewPayable";
import { PaymentHistory } from "./components/finance/tuition/PaymentHistory";
import ReceivablesList from "./pages/finance/receivables/ReceivablesList";
import NewReceivable from "./pages/finance/receivables/NewReceivable";
import TuitionControl from "./pages/finance/tuition/TuitionControl";
import TuitionGenerate from "./pages/finance/tuition/TuitionGenerate";
import Index from "./pages/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/finance" element={<Finance />} />
        
        {/* Contas a Pagar */}
        <Route path="/finance/payables/list" element={<PayablesList />} />
        <Route path="/finance/payables/new" element={<NewPayable />} />
        
        {/* Contas a Receber */}
        <Route path="/finance/receivables/list" element={<ReceivablesList />} />
        <Route path="/finance/receivables/new" element={<NewReceivable />} />
        
        {/* Mensalidades */}
        <Route path="/finance/tuition/control" element={<TuitionControl />} />
        <Route path="/finance/tuition/generate" element={<TuitionGenerate />} />
        <Route path="/finance/student/:studentId/history" element={<PaymentHistory />} />
        
        {/* Outras rotas */}
        <Route path="/students" element={<Students />} />
        <Route path="/cadastros/alunos/novo" element={<NovoAluno />} />
        <Route path="/cadastros/alunos/lista" element={<ListaAlunos />} />
        <Route path="/cadastros/alunos/:id/historico" element={<HistoricoAluno />} />
        <Route path="/workouts" element={<Plans />} />
      </Routes>
    </Router>
  );
}

export default App;