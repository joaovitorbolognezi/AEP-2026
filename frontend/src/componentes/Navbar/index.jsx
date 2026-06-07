import './Navbar.css'
 
function Navbar({ onNavClick, onVerificar, total = 0 }) {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <button
          className="navbar-btn"
          onClick={() => onNavClick && onNavClick('por-que-denunciar')}
        >
          Por que denunciar ?
        </button>
        <button
          className="navbar-btn"
          onClick={() => onNavClick && onNavClick('sistema-de-triagem')}
        >
          Verifique onde denunciar !
        </button>
        <button
          className="navbar-btn navbar-btn-destaque"
          onClick={onVerificar}
        >
          Lista de encaminhamentos realizados
          {total > 0 && <span className="navbar-bolinha">{total}</span>}
        </button>
      </div>
    </nav>
  )
}
 
export default Navbar

