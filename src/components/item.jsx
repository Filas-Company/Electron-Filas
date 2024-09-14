import {useState} from "react"

function Item({ item, updateDocument, deleteDocument, updateFila }) {

  const [tempText, setTempText] = useState("")

  return (
    <li class="filas"
      style={item.active ? {} : { backgroundColor: "#B17A5B" }}
    >
      <div class="lugar">
        <p>{item.ordem}º</p>
      </div>
      
      {((item.edit) || (item.text === "")) 
        ?
        <input 
          className="filas-content"
          type="text" 
          placeholder={item.text} 
          onChange={(e) => {setTempText(e.target.value)}}
          onBlur={() => {updateDocument({...item, text: tempText, edit: false})}}
        />
        :
        <span 
          className="filas-content"
          onClick={() => {updateDocument({ ...item, edit: true })}}
        >{item.text}</span>
      }
      
      <p>{item.codigo}</p>

      <div className="buttons">
        <button className="del" onClick={() => {(deleteDocument(item))}}>Apagar</button>
        
        <button className="chamar" onClick={() => {updateFila({ ...item, active: !item.active })
        }}
        >Chamar</button>
      </div>
    </li>
  )
}

export default Item