function Pronto({ item, highlighted}) {

  return (
    <li className={`pedidos-prontos ${highlighted ? 'highlighted' : ''}`}>
      <p>{item.codigo}</p>
    </li>
  )
}

export default Pronto
