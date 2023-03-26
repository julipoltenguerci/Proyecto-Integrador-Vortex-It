import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../actions/employeeActions";

import {
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Container,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import { removeEmployee } from "../actions/employeeActions";
import { Dialog } from "../commons/Dialog";
import { PageTitle } from "../commons/PageTitle";

const columns = [
  { id: "id_employee", label: "ID", minWidth: 50, align: "center" },
  { id: "first_name", label: "Nombre", minWidth: 50, align: "center" },
  { id: "last_name", label: "Apellido", minWidth: 50, align: "center" },
  { id: "cuit", label: "Cuit", minWidth: 50, align: "center" },
  { id: "rol", label: "Rol", minWidth: 50, align: "center" },
  {
    id: "actions",
    label: "Acciones",
    minWidth: 50,
    align: "center",
    component: (employee, viewAction, deleteAction) => (
      <>
        <IconButton aria-label="view" onClick={() => viewAction(employee)}>
          <Visibility />
        </IconButton>

        <IconButton aria-label="delete" onClick={() => deleteAction(employee)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];
export const EmployeeList = () => {
  // ------------ HOOKS ------------
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const employees = useSelector((state) => state.employeesSlice.employees);

  const totalEmployees = useSelector(
    (state) => state.employeesSlice.totalEmployees
  );

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [employeeToDelete, setEmployeeToDelete] = useState();

  const [searchFirstName, setSearchFirstName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchRol, setSearchRol] = useState("");

  const totalPaginas = useMemo(
    () => Math.ceil(totalEmployees / rowsPerPage),
    [totalEmployees, rowsPerPage]
  );

  useEffect(() => {
    dispatch(
      getEmployees({
        page,
        limit: rowsPerPage,
        first_name: searchFirstName,
        last_name: searchLastName,
        rol: searchRol,
      })
    );
  }, [dispatch, page, rowsPerPage, searchFirstName, searchLastName, searchRol]);

  // ------------ FUNCTIONS ------------

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const handleViewAction = useCallback(
    (employee) => navigate(`/employee/${employee.id_employee}`),
    [navigate]
  );

  const handleDeleteAction = useCallback(
    (employee) => setEmployeeToDelete(employee),
    []
  );

  const inputFirstNameOnChange = (value) => setSearchFirstName(value);
  const inputLastNameOnChange = (value) => setSearchLastName(value);
  const inputRolOnChange = (value) => setSearchRol(value);

  const handleAcceptDialog = useCallback(() => {
    dispatch(removeEmployee(employeeToDelete));
    setEmployeeToDelete();
  }, [dispatch, employeeToDelete]);

  // ------------ RENDERS ------------
  return (
    <>
      <PageTitle>Gestor de Empleados - Vortex IT</PageTitle>
      <Paper sx={{ width: "100%" }}>
        <Container
          sx={{
            marginLeft: "0px",
            display: "flex",
            gap: "30px",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <TextField
            id="name-search"
            label="Búsqueda por Nombre"
            type="search"
            onChange={(event) => inputFirstNameOnChange(event.target.value)}
          >
            {" "}
          </TextField>

          <TextField
            id="last-name-search"
            label="Búsqueda por Apellido"
            type="search"
            onChange={(event) => inputLastNameOnChange(event.target.value)}
          >
            {" "}
          </TextField>

          <TextField
            id="rol-search"
            label="Búsqueda por Rol"
            type="search"
            onChange={(event) => inputRolOnChange(event.target.value)}
          >
            {" "}
          </TextField>
        </Container>

        <TableContainer sx={{ maxHeight: 500 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      top: 57,
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {totalEmployees ? (
                employees.map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id_employee}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.component
                            ? column.component(
                                row,
                                handleViewAction,
                                handleDeleteAction
                              )
                            : column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ color: "#9c27b0", textAlign: "center" }}
                  >
                    No hay RRHH disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalEmployees}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={(paginationInfo) =>
            `${paginationInfo.from}–${paginationInfo.to} de ${paginationInfo.count} empleados (${totalPaginas} páginas)`
          }
        />
      </Paper>

      {/* condic para eliminar empleado: setEmployee seteado para eliminar y haber aceptado  */}
      {employeeToDelete && (
        <Dialog
          isOpen={true}
          title={`¿Desea eliminar el empleado ${employeeToDelete.last_name} ${employeeToDelete.first_name}?`}
          closeLabel="Cancelar"
          onClose={() => setEmployeeToDelete()}
          acceptLabel="Eliminar"
          onAccept={handleAcceptDialog}
        ></Dialog>
      )}
    </>
  );
};
