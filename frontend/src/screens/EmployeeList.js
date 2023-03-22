import React from "react";
import { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
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

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [employeeToDelete, setEmployeeToDelete] = useState();

  // ------------ FUNCTIONS ------------

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const employeesToDisplay = useMemo(
    () => employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [employees, page, rowsPerPage]
  );

  const handleViewAction = useCallback(
    (employee) => navigate(`/employee/${employee.id_employee}`),
    [navigate]
  );

  const handleDeleteAction = useCallback(
    (employee) => setEmployeeToDelete(employee),
    []
  );

  const handleAcceptDialog = useCallback(() => {
    dispatch(removeEmployee(employeeToDelete));
    setEmployeeToDelete();
  }, [dispatch, employeeToDelete]);

  // ------------ RENDERS ------------

  return (
    <>
      <PageTitle>Gestor de Empleados - Vortex IT</PageTitle>
      <Paper sx={{ width: "100%" }}>
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
              {employees.length ? (
                employeesToDisplay.map((row) => (
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
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
