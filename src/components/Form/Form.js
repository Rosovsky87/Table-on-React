import React, { useState } from 'react';
import { data } from '../../person.json';
import './form.css';


// Параметры "DOCNUM" "FIRSTNAME" "LASTNAME" сделал обязательными.
// Ообязательными параметрами они являются просто для примера.


const keys = data.metaData.map(el => el.name);
const initialState = keys.reduce((dataObject, key) => {
  return {
    ...dataObject,
    [key]: '',
  };
}, {});


const Form = ({ addTheClient }) => {

  const [text, setText] = useState(initialState)

  function updateState(event) {
    const { name, value } = event.target
    setText(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function submitHandler(e) {
    e.preventDefault();
    const { LASTNAME, FIRSTNAME, CARD } = text;

    if (!CARD || !LASTNAME || !FIRSTNAME) {
      alert('Заполните все обязательные поля воода отмеченные (*) : "CARD", "LASTNAME", "FIRSTNAME"');
      return
    }

    addTheClient(text);
    setText(initialState)
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      {
        keys.map(el => (
          <input
            key={el}
            placeholder={el === "CARD" || el === "LASTNAME" || el === "FIRSTNAME" ? `${el} *` : el}
            value={text[el]}
            name={el}
            onChange={(event) => updateState(event)} />
        ))
      }
      <button className='btn-form' >добавить</button>
    </form>
  )
}

export default Form