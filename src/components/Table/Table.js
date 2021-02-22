import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { COLUMNS } from '../App/App';
import './table.css';


export const Table = ({ combinedData, onDelete }) => {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => combinedData, [combinedData]);

  const tableInstance = useTable({
    columns,
    data
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('header')}</th>
                ))}
              <th>DELETE</th>
            </tr>
          ))
        }
      </thead >
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                <td>
                  <button
                    className='btn-table'
                    onClick={() => onDelete(row.index)}
                  >удалить</button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table >
  )
}