import React, { useState } from 'react';
import Modal from 'react-modal';
import '../CSS/alert.css';

Modal.setAppElement('#root');

const Alert = ({ isOpen, onClose, onConfirm, lista }) => {
  const [inputValue, setInputValue] = useState('');
  const availableItems = lista;

  const handleConfirm = () => {
    // Converte o inputValue para string para garantir comparação adequada
    const inputValueString = inputValue.toString();
    const foundItem = availableItems.find(item => item.codigo.toString() === inputValueString);
    
    if (foundItem) {
      onConfirm(foundItem);
      console.log('highlightedSenha:', foundItem);
    } else {
      alert("Número ou string não encontrado(a) ou inválido(a). Por favor, insira um valor válido.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="custom-modal-header">
        {/*<button onClick={onClose} className="close-button">X</button>*/}
      </div>
      <div className="custom-modal-body">
        <h2 className='alert-text'>Qual a sua senha?</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a code"
          className="input-number"
          list="code-list"
        />
        <datalist id="code-list">
          {availableItems.map((item) => (
            <option key={item.codigo} value={item.codigo} />
          ))}
        </datalist>
        <div className="modal-buttons">
          <button onClick={onClose} className="cancel-button">Cancelar</button>
          <button onClick={handleConfirm} className="confirm-button">Continuar</button>
        </div>
      </div>
    </Modal>
  );
};

export default Alert;
