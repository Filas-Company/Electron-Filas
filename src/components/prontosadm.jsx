import { useState } from "react";

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar, chamarFila, fetchData }) {
  const [tempText, setTempText] = useState(item.text);
  const [tempCod, setTempCod] = useState(item.codigo);

  return (
    <li
      className="fila-adm"
      style={{
        backgroundColor:
          item.status === 1 ? "#BE0E19" : item.status === 2 ? "#a6a6a6" : "#ffffff",
      }}
    >
      <div className="pos-adm"
      style={{
        color:
          item.status === 1 ? "white" : item.status === 2 ? "#a6a6a6" : "#BE0E19",
      }}
      >
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
          updateDocument({ ...item, text: tempText }).then(fetchData);
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
        {(item.status === 1 || item.status === 2) && (
          <button
            className="btn-adm-voltar"
            onClick={() => {
              updateVoltar({ ...item, status: 3 }).then(fetchData);
            }}
          >
            ↩
          </button>
        )}

        <button
          className="btn-adm-chamar"
          onClick={() => {
            chamarFila(item).then(fetchData);
          }}          
        >
          ☑
        </button>

        <button 
          className="btn-adm-del"
          onClick={() => {
            deleteDocument(item).then(fetchData);
          }}
        >
          x
        </button>
      </div>
    </li>
  );
}

export default Item;
