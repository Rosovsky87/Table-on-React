import React, { Component, useState } from 'react';
import { data } from '../../person.json';
import { Table } from '../Table/Table';
import Form from '../Form/Form';


// В данном тестовом задании ВЫ встертите мои комментарии по коду в верхней части некоторых js файлов.
// В реальной работе комментарии оставляю, только если того требует проект и/или руководство, по этому заране предупреждаю,что комментарии могут показаться Вам излишними. 
// В этом файле представлены два вида компонента App: классовый и функциональный (один из них закоментирован и готов к работе).
// Написал оба так как кто-то педпочитает всё приложение писать только на функицональных компонентах, кто-то предпочитает наличие различных видов компонент.
// State у приложения минимальный и логики в приложении тоже не много, по этому все основные данные решил сосредоточить в App.
// По той же причине не стал использовать Redux, так как посчитал, что в нём нет смысла в таком маленьком приложении.



const keys = data.metaData.map(el => el.name);
const clientsData = data.rows;

const mapObject = (keys, client) => {
  return keys.reduce((dataObject, key, index) => {
    return {
      ...dataObject,
      [key]: client[index],
    };
  }, {});
};

const usersList = clientsData.map((client) => mapObject(keys, client));
const COLUMNS = keys.map(el => (
  {
    header: el,
    accessor: el
  }
))


// Вариант КЛАССОВОГО компонента

class App extends Component {
  state = {
    combinedData: usersList
  }

  addTheClient = (newClient) => {
    this.setState(({ combinedData }) => {
      return {
        combinedData: combinedData.concat(newClient)
      }
    })
  }

  onDelete = (index) => {
    const newData = this.state.combinedData;
    const filtredData = newData.filter((el, indx) => indx !== index);
    this.setState(() => {
      return {
        combinedData: filtredData
      }
    })
  }

  render() {
    return (
      <>
        <Table
          combinedData={this.state.combinedData}
          onDelete={(index) => this.onDelete(index)} />
        <Form
          addTheClient={(data) => this.addTheClient(data)} />
      </>
    )
  }
}



// Вариант ФУНКЦИОНАЛЬНОГО компонента

// const App = () => {

//   const [combinedData, setCombinedData] = useState(usersList);

//   const addTheClient = (newClient) => {
//     setCombinedData([...combinedData, newClient])
//   }

//   const onDelete = (index) => {
//     const newData = combinedData.filter((el, indx) => indx !== index);
//     setCombinedData(newData);
//   }

//   return (
//     <>
//       <Table
//         combinedData={combinedData}
//         onDelete={(index) => onDelete(index)} />
//       <Form
//         addTheClient={(data) => addTheClient(data)} />
//     </>
//   )
// }

export { App, COLUMNS, keys }