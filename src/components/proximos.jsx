function Proximo({ item, highlighted }) {
  return (
    <li className={`filas ${highlighted ? 'highlighted' : ''}`}>
      {/*
      <div className="lugar">
        <p>{(item.ordem)+1}º</p>
      </div>
      */}
      
      <p className="senha">
        {
          item.codigo
        }
      </p>
      <p className="code">
        {
          item.text ? item.text : ""
        }
      </p>
    </li>
  );
}

export default Proximo;