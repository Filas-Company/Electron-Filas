function Chamando({ item }) {

    return (
      <li className='chamando'>
        {/*
        <div className='pos'>1º</div>
        */}
        <p>Senha atual</p>
        <h1>{item.codigo}</h1>
        <div className='name'>{item.text}</div>
      </li>
    )
  }
  
  export default Chamando
  