import Formulario2 from "./components/Formulario/Formulario2"
import './App.css'

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Proyecto Automatización - AquaChile</h1>
        <p>Sistema de Solicitud de Evaluación Psicolaboral</p>
      </header>

      <main style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '500px' }}>
          <Formulario2 />
        </div>
      </main>
    </div>
  )
}

export default App