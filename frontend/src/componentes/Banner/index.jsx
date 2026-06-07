import './banner.css'
import Navbar from '../Navbar'
import bannerImg from '../../assets/banner.jpeg'
 
function Banner({ onNavClick, onVerificar, total }) {
  return (
    <header className="banner">
      <h1>DENÚNCIAS <span className="destaque">ONLINE</span></h1>
      <img src={bannerImg} alt="banner do site" />
      <Navbar
        onNavClick={onNavClick}
        onVerificar={onVerificar}
        total={total}
      />
    </header>
  )
}
 
export default Banner