import './Botao.css'

const Botao = (props) => {
    return (<button className='botao' onClick={props.onClick}>
        {props.texto}
    </button>
    )
}

export default Botao