import './Painel.css'

const Painel = ({ fila, onVoltar, onProcessar }) => {
  const itens = [...fila.items]

  const handleRemover = () => {
    fila.dequeue()
    onProcessar()
  }

  return (
    <section className="painel">
      <div className="painel-card">
        <div className="painel-header">
          <div>
            <h2>Pessoas que já foram ajudadas</h2>
            <p className="painel-sub">
              Cada denúncia abaixo representa alguém que encontrou coragem de falar.
              A sua entra aqui em tempo real assim que você envia e nenhuma é ignorada.
              Todas são analisadas na ordem de chegada, uma a uma.
            </p>
          </div>
          <span className="painel-badge">{itens.length} registros</span>
        </div>

        {itens.length === 0 ? (
          <p className="painel-vazio">Nenhuma denúncia registrada ainda. Seja o primeiro.</p>
        ) : (
          <div className="painel-lista">
            {itens.map((d) => (
              <div key={d.protocolo} className="painel-item">
                <div className="painel-item-info">
                  <div className="painel-item-topo">
                    <span className="painel-tag">{d.categoria}</span>
                  </div>
                  <p className="painel-item-nome">
                    {d.nome} · Protocolo {d.protocolo} · {d.hora}
                  </p>
                  <a
                    href={d.encaminhamento}
                    target="_blank"
                    rel="noreferrer"
                    className="painel-item-link"
                  >
                    Ver encaminhamento →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="painel-acoes">
          <button className="painel-btn-voltar" onClick={onVoltar}>
            ← Voltar
          </button>
          {itens.length > 0 && (
            <button className="painel-btn-remover" onClick={handleRemover}>
              Remover encaminhamento
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Painel