import React, { useState, useEffect, useMemo, useRef } from "react";
import ApiService from "../../services/ApiService";
import ModalBorrar from "../ModalBorrar";
import { useHistory } from "react-router-dom";
import FilterTable from "../FilterTable";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Alert from "../Alert";
import { Container } from "react-bootstrap";

const TutorialsList = (props) => {
  //console.log("Render Clientes");
  const token = "123";
  const [clientes, setClientes] = useState([]);
  const [alertData, setAlertData] = useState({
    show: false,
    msg: "mensaje alert",
    color: "green",
  });
  const [dataBorrar, setDataBorrar] = useState({
    rowIndexBorrar: null,
    isModalOpen: false,
  });

  const clientesRef = useRef();
  const history = useHistory();

  clientesRef.current = clientes;

  useEffect(() => {
    retrieveClientes();
  }, []);

  const retrieveClientes = async () => {
    try {
      const response = await ApiService.getClientes(
        `${process.env.REACT_APP_BASE_URL}/autos`,
        token
      );
      //console.log(response.data.data);
      setClientes(response.data.data);
    } catch (error) {}
  };

  const editCliente = (rowIndex) => {
    const patente = clientesRef.current[rowIndex].patente;
    history.push("edit/" + patente);
  };

  const agregarItem = () => {
    history.push("add/");
  };

  const openModalBorrar = (rowIndex) => {
    const patente = clientesRef.current[rowIndex].patente;
    setDataBorrar({
      ...dataBorrar,
      isModalOpen: true,
      rowIndexBorrar: rowIndex,
      texto: "Seguro que desea borrar :" + patente + "?",
    });
  };

  const cancelModalBorrar = () => {
    setDataBorrar({
      ...dataBorrar,
      isModalOpen: false,
      rowIndexBorrar: null,
    });
  };

  const confirmBorrar = () => {
    setDataBorrar({
      ...dataBorrar,
      isModalOpen: false,
      texto: "",
    });
    borrarCliente(dataBorrar.rowIndexBorrar);
  };

  const borrarCliente = (rowIndex) => {
    const patente = clientesRef.current[rowIndex].patente;
    ApiService.deleteCliente(patente, token)
      .then(() => {
        let newClientes = [...clientesRef.current];
        newClientes.splice(rowIndex, 1);
        setClientes(newClientes);
        setAlertData({
          color: "red",
          msg: "Cliente Borrado Con Exito !!",
          show: true,
        });
      })
      .catch((err) => {
        console.log("error borrado ", err);
      });
  };

  const closeAlert = () => {
    setAlertData({ ...alertData, show: false });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre",
        sortType: "basic",
      },
      {
        Header: "Telefono",
        accessor: "telefono",
        sortType: "basic",
      },
      {
        Header: "Patente",
        accessor: "patente",
      },
      {
        Header: "Acciones",
        accessor: "actions",
        disableSortBy: true,
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => editCliente(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => openModalBorrar(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    prepareRow,
    setGlobalFilter,
    preGlobalFilteredRows,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data: clientes,
    },

    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <div>
      {dataBorrar.isModalOpen && (
        <ModalBorrar
          confirmAction={confirmBorrar}
          cancelModalBorrar={cancelModalBorrar}
          texto={dataBorrar.texto}
        />
      )}
      <div className="list row">
        <FilterTable
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="col md-6 d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={agregarItem}>
            Agregar
          </button>
        </div>
        {alertData.show && (
          <Container className="container">
            <Alert
              closeAlert={closeAlert}
              alertContent={alertData.msg}
              color={alertData.color}
            />
          </Container>
        )}

        <div className="col-md-12 list">
          <table
            className="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <i className="fa fa-fast-backward" aria-hidden="true"></i>
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>{" "}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <i className="fa fa-fast-forward" aria-hidden="true"></i>
            </button>{" "}
            <span>
              Pagina{" "}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </select>
          </div>

          <br />
        </div>

        {/* <div className="col-md-8">
          <button className="btn btn-lg btn-success" onClick={agregarItem}>
            Agregar
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default TutorialsList;
