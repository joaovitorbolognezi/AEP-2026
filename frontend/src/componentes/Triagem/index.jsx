import { useState } from 'react'
import denunciasSalvas from '../../denuncias.json'
import './Triagem.css'

let proximoProtocolo = denunciasSalvas.length + 1

const CATEGORIAS = [
  { id: 'casamento_infantil',  label: 'Casamento Infantil' },
  { id: 'acesso_educacao',     label: 'Acesso à Educação' },
  { id: 'trabalho_escravo',    label: 'Trabalho Escravo' },
  { id: 'tortura',             label: 'Tortura' },
  { id: 'liberdade_religiosa', label: 'Liberdade Religiosa' },
  { id: 'liberdade_expressao', label: 'Liberdade de Opinião e Expressão' },
]

const PERGUNTAS = [
  { id: 'vitima_menor',    label: 'A vítima é menor de 18 anos?' },
  { id: 'agressor_estado', label: 'O agressor é agente do Estado (policial, servidor, etc)?' },
  { id: 'situacao_atual',  label: 'A situação ainda está acontecendo?' },
  { id: 'ja_denunciou',    label: 'Já tentou denunciar antes sem resultado?' },
]

const ENCAMINHAMENTOS = {
  casamento_infantil: [
    { texto: 'Ministério dos Direitos Humanos - Criança e Adolescente', url: 'https://www.gov.br/mdh/pt-br/navegue-por-temas/crianca-e-adolescente' },
    { texto: 'Disque 100 no telefone ou Denuncie pelo site', url: 'https://falabr.cgu.gov.br/v2/manifestacoes/registrar' },
  ],
  acesso_educacao: [
    { texto: 'Ministério da Educação', url: 'https://www.gov.br/mec/pt-br' },
    { texto: 'Disque 100 no telefone ou Denuncie pelo site', url: 'https://falabr.cgu.gov.br/v2/manifestacoes/registrar' },
  ],
  trabalho_escravo: [
    { texto: 'Ministério dos Direitos Humanos - Tráfico de Pessoas', url: 'https://www.gov.br/mdh/pt-br/navegue-por-temas/trafico-de-pessoas' },
    { texto: 'Disque 100 no telefone ou Denuncie pelo site', url: 'https://falabr.cgu.gov.br/v2/manifestacoes/registrar' },
  ],
  tortura: [
    { texto: 'Ministério dos Direitos Humanos - Combate à Tortura', url: 'https://www.gov.br/mdh/pt-br/navegue-por-temas/combate-a-tortura' },
    { texto: 'Disque 100 no telefone ou Denuncie pelo site', url: 'https://falabr.cgu.gov.br/v2/manifestacoes/registrar' },
  ],
  liberdade_religiosa: [
    { texto: 'Ministério dos Direitos Humanos - Igualdade Racial', url: 'https://www.gov.br/mdh/pt-br/navegue-por-temas/igualdade-racial' },
    { texto: 'Disque 100 no telefone ou Denuncie pelo site', url: 'https://falabr.cgu.gov.br/v2/manifestacoes/registrar' },
  ],
  liberdade_expressao: [
    { texto: 'Ouvidoria Nacional de Direitos Humanos', url: 'https://www.gov.br/mdh/pt-br/ondh' },
    { texto: 'Disque 100 no telefone ou Denuncie pelo site', url: 'https://falabr.cgu.gov.br/v2/manifestacoes/registrar' },
  ],
}

const Triagem = ({ fila: filaGlobal, onEnviar }) => {
  const [nome, setNome] = useState('')
  const [categorias, setCategorias] = useState({})
  const [respostas, setRespostas] = useState({})
  const [erro, setErro] = useState('')
  const [resultado, setResultado] = useState(null)

  const toggleCategoria = (id) => {
    setCategorias(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleResposta = (id) => {
    setRespostas(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const categoriasSelecionadas = CATEGORIAS.filter(c => categorias[c.id])

  const handleEnviar = () => {
    if (categoriasSelecionadas.length === 0) {
      setErro('Selecione pelo menos uma categoria.')
      return
    }
    setErro('')

    const categoriaPrincipal = categoriasSelecionadas[0]

    const denuncia = {
      protocolo: String(proximoProtocolo).padStart(3, '0'),
      nome: nome.trim() || 'Anônimo',
      categoria: categoriaPrincipal.label,
      respostas,
      encaminhamento: ENCAMINHAMENTOS[categoriaPrincipal.id][0].url,
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }

    proximoProtocolo++
    filaGlobal.enqueue(denuncia)

    setResultado({ denuncia, categoriasSelecionadas })
    setCategorias({})
    setRespostas({})
    setNome('')
    onEnviar()
  }

  if (resultado) {
    return (
      <section className="triagem">
        <div className="triagem-card triagem-resultado">
          <h2>Com base nas suas respostas, recomendamos:</h2>
          <div className="triagem-encaminhamento">
            <p className="triagem-enc-titulo">Com base nas suas respostas, recomendamos:</p>
            {resultado.categoriasSelecionadas.map(cat => (
              <div key={cat.id} className="triagem-enc-grupo">
                <span className="triagem-enc-cat">{cat.label}</span>
                {ENCAMINHAMENTOS[cat.id].map((enc, i) => (
                  <a
                    key={i}
                    href={enc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="triagem-enc-link"
                  >
                    → {enc.texto}
                  </a>
                ))}
              </div>
            ))}
          </div>

          <button className="triagem-btn-secundario" onClick={() => setResultado(null)}>
            Retornar à Tela Inicial
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="sistema-de-triagem" className="triagem">
      <div className="triagem-card">
        <h2>Sistema de Triagem</h2>
        <p className="triagem-sub">Responda as perguntas abaixo para analisarmos sua denúncia e te indicar o encaminhamento correto.</p>

        <div className="triagem-grupo">
          <label className="triagem-label">Seu nome (opcional)</label>
          <input
            className="triagem-input"
            placeholder="Deixe em branco para permanecer anônimo"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </div>

        <div className="triagem-grupo">
          <label className="triagem-label">Qual tipo de violação você quer denunciar? *</label>
          <div className="triagem-opcoes">
            {CATEGORIAS.map(cat => (
              <label key={cat.id} className={`triagem-opcao ${categorias[cat.id] ? 'selecionada' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!categorias[cat.id]}
                  onChange={() => toggleCategoria(cat.id)}
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        <div className="triagem-grupo">
          <label className="triagem-label">Sobre o caso:</label>
          <div className="triagem-opcoes">
            {PERGUNTAS.map(p => (
              <label key={p.id} className={`triagem-opcao ${respostas[p.id] ? 'selecionada' : ''}`}>
                <input
                  type="checkbox"
                  checked={!!respostas[p.id]}
                  onChange={() => toggleResposta(p.id)}
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>

        {erro && <p className="triagem-erro">{erro}</p>}

        <button className="triagem-btn" onClick={handleEnviar}>
          Enviar e ver encaminhamento →
        </button>
      </div>
    </section>
  )
}

export default Triagem