import React, { useState } from 'react';
import { data } from '../../person.json';
import './form.scss';


// Параметры "DOCNUM" "FIRSTNAME" "LASTNAME" сделал обязательными.
// Ообязательными параметрами они являются просто для примера.


const keys = data.metaData.map(el => el.name);
const initialState = keys.reduce((dataObject, key) => {
  return {
    ...dataObject,
    [key]: '',
  };
}, {});


function submitHandler(e, textValue, setText, addTheClient) {
  e.preventDefault();
  const { LASTNAME, FIRSTNAME, CARD } = textValue;

  if (!CARD || !LASTNAME || !FIRSTNAME) {
    alert('Заполните все обязательные поля воода отмеченные (*) : "CARD", "LASTNAME", "FIRSTNAME"');
    return
  }

  addTheClient(textValue);
  setText(initialState);
}

const REQUIRED_FIELDS = ["CARD", "LASTNAME", "FIRSTNAME"];

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



  return (
    <form onSubmit={(e) => submitHandler(e, text, setText, addTheClient)}>
      {
        keys.map(el => (
          <input
            key={el}
            placeholder={REQUIRED_FIELDS.includes(el) ? `${el} *` : el}
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