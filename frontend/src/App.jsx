import { useState } from 'react'
import Queue from './fila.js'
import denunciasSalvas from './denuncias.json'
import Banner from './componentes/Banner/index.jsx'
import Historia from './componentes/Historia/index.jsx'
import Triagem from './componentes/Triagem/index.jsx'
import Painel from './componentes/Painel/index.jsx'

const filaGlobal = new Queue()
denunciasSalvas.forEach(d => filaGlobal.enqueue(d))

function App() {
  const [pagina, setPagina] = useState('home')
  const [tick, setTick] = useState(0)

  const atualizar = () => setTick(t => t + 1)

  const scrollToSection = (id) => {
    setPagina('home')
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const total = filaGlobal.size()

  return (
    <div className="App">
      {pagina === 'home' && (
        <>
          <Banner
            onNavClick={scrollToSection}
            onVerificar={() => setPagina('painel')}
            total={total}
          />
          <Historia />
          <Triagem fila={filaGlobal} onEnviar={atualizar} />
        </>
      )}

      {pagina === 'painel' && (
        <Painel
          fila={filaGlobal}
          onVoltar={() => setPagina('home')}
          onProcessar={atualizar}
        />
      )}
    </div>
  )
}

export default App