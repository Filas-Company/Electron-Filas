import { useState } from "react";

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar }) {
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
            item.ordem === 0 ? item.ordem
            : item.ordem === -1 ? item.ordem+2
            : item.ordem+1
          }
        º</p>
      </div>

      {/* Campo de texto sempre como input */}
      <input
        className="nome-adm"
        value={tempText}
        type="text"
        onChange={(e) => {
          setTempText(e.target.value);
        }}
        onBlur={() => {
          updateDocument({ ...item, text: tempText, edit: false });
          setTempText(tempText);
        }}
      />

      {/* Campo de código sempre como input */}
      <input
        className="senha-adm"
        value={tempCod}
        type="text"
        onChange={(e) => {
          setTempCod(e.target.value);
        }}
        onBlur={() => {
          updateDocument({ ...item, codigo: tempCod, editcod: false });
          setTempCod(tempCod);
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
          className="btn-adm-del"
          onClick={() => {
            updateFila(item);
          }}
        >
          Chamar
        </button>

        <button className="btn-adm-del" onClick={() => deleteDocument(item)}>
          X
        </button>
      </div>
    </li>
  );
}

export default Item;
