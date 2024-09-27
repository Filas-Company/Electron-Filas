import { useState } from "react";

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar, chamarFila, fetchData }) {
  const [tempText, setTempText] = useState(item.text);
  const [tempCod, setTempCod] = useState(item.codigo);

  return (
    <li
      className="fila-adm"
      style={{
        backgroundColor:
          item.ordem === -1 ? "#ffffff" : item.ordem === 0 ? "#ffffff" : "#ffffff",
      }}
    >
      <div className="pos-adm">
        <p>{
            item.posicao
          }
        º</p>
      </div>

      <input
        className="nome-adm"
        value={tempText}
        type="text"
        onChange={(e) => setTempText(e.target.value)}
        onBlur={() => {
          updateDocument({ ...item, text: tempText });
        }}
      />
      <input
        className="senha-adm"
        value={tempCod}
        type="text"
        onChange={(e) => setTempCod(e.target.value)}
        onBlur={() => {
          updateDocument({ ...item, codigo: tempCod }).then(fetchData);
        }}
      />

      <div className="btn-adm">
        {(item.ordem === 0 || item.ordem === -1) && (
          <button
            className="btn-adm-voltar"
            onClick={() => {
              updateVoltar({ ...item, active: !item.active });
            }}
          >
            voltar
          </button>
        )}

        <button
          className="btn-adm-chamar"
          onClick={() => {
            chamarFila(item).then(fetchData);
          }}          
        >
          Chamar
        </button>

        <button 
          className="btn-adm-del"
          onClick={() => {
            deleteDocument(item).then(fetchData);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default Item;
