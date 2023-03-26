import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import {
  addEmployee,
  editEmployee,
  getEmployee,
  updateEmployee,
} from "../actions/employeeActions";
import { Dialog } from "../commons/Dialog";
import { PageTitle } from "../commons/PageTitle";
import { Box, Button, Container, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";

export const EmployeeForm = () => {
  // ------------ HOOKS ------------
  const dispatch = useDispatch();

  const { id_employee } = useParams();

  const navigate = useNavigate();

  const formRef = useRef();

  const employee = useSelector((state) => state.employeesSlice.employee);
  const error = useSelector((state) => state.employeesSlice.error);

  const [isEditing, setIsEditing] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //const [hasError, setHasError] = useState(false);

  useEffect(() => {
    dispatch(getEmployee(id_employee));
  }, [dispatch, id_employee]);

  useEffect(() => {
    console.error("useEffect employee.id_employee", error);
    if (!error) {
      setIsEditing(!employee.id_employee);
    } else {
      setIsDialogOpen(false);
    }
  }, [employee.id_employee]);

  /*  useEffect(() => {
    if (error !== null) {
      setIsDialogOpen(false);
      console.error("Error while adding employee:", error);
    } else {
      console.error("useEffect error", error);
      //setIsDialogOpen(true);
    }
  }, [error]); */

  console.log("isDialogOpen", isDialogOpen);
  console.log("****************error: ", error);
  // ------------ FUNCTIONS ------------
  const inputOnChange = useCallback(
    (key, value) =>
      dispatch(
        updateEmployee({
          ...employee,
          [key]: value,
        })
      ),
    [dispatch, employee]
  );

  const handleAddNewEmployee = useCallback(async () => {
    if (formRef.current.reportValidity()) {
      try {
        dispatch(addEmployee(employee));
        setIsDialogOpen(true);
      } catch (err) {}
    }
  }, [dispatch, employee]);

  const handleEditEmployee = useCallback(() => {
    if (formRef.current.reportValidity()) {
      dispatch(editEmployee(employee));
      setIsDialogOpen(true);
    }
  }, [dispatch, employee]);

  const handleCancel = useCallback(() => {
    dispatch(getEmployee(id_employee));
    setIsEditing(false);
  }, [dispatch, id_employee]);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);

    if (id_employee) {
      setIsEditing(false);
    } else {
      navigate("/");
    }
  }, [id_employee, navigate]);

  // ------------ RENDERS ------------
  return (
    <>
      <PageTitle>
        {id_employee
          ? `ID del Empleado/a: ${employee.id_employee}`
          : "Agregar Nuevo Empleado"}
      </PageTitle>
      <Container
        sx={{
          maxWidth: "sm",
          bgcolor: "#f5f5f5",
          mt: 4,
          padding: "24px",
        }}
      >
        <Box
          //Referencia objeto html del form para acceso al método report validity y mostrar msj de validación
          ref={formRef}
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            "& .MuiTextField-root": {
              flex: 1,
            },
          }}
          autoComplete="off"
        >
          <div style={{ display: "flex", gap: "24px" }}>
            <TextField
              required
              label="Nombre"
              value={employee.first_name}
              disabled={!isEditing}
              onChange={(event) =>
                // setEmployee({
                //   ...employee,
                //   ["first_name"]: event.target.value,
                // })
                inputOnChange("first_name", event.target.value)
              }
            />
            <TextField
              required
              label="Apellido"
              type="text"
              value={employee.last_name}
              disabled={!isEditing}
              onChange={(event) =>
                inputOnChange("last_name", event.target.value)
              }
            />
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <TextField
              required
              label="Cuit"
              type="number"
              value={employee.cuit}
              disabled={!isEditing}
              onChange={(event) => inputOnChange("cuit", event.target.value)}
            />
            <TextField
              required
              label="Team Id"
              type="number"
              value={employee.team_id}
              disabled={!isEditing}
              onChange={(event) => inputOnChange("team_id", event.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <TextField
              required
              label="Fecha Contratación"
              type="date"
              value={employee.join_date}
              disabled={!isEditing}
              onChange={(event) =>
                inputOnChange("join_date", event.target.value)
              }
              InputLabelProps={{ shrink: true }} //con esta prop label queda outline
            />
            <TextField
              required
              label="Rol"
              type="text"
              value={employee.rol}
              disabled={!isEditing}
              onChange={(event) => inputOnChange("rol", event.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "24px" }}>
            {/* Save, edit or cancel buttons */}
            {id_employee ? (
              isEditing ? (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleEditEmployee}
                  >
                    Guardar Empleado
                  </Button>
                  <Button
                    color="info"
                    variant="contained"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Empleado
                </Button>
              )
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleAddNewEmployee}
              >
                Agregar Empleado
              </Button>
            )}
          </div>
        </Box>
      </Container>
      {error ? (
        <div>
          <Alert severity="error">{error}</Alert>
        </div>
      ) : null}
      {
        <Dialog
          //inicializada en false
          isOpen={isDialogOpen}
          title={
            id_employee
              ? `¡Se ha editado correctamente el empleado ${employee.last_name} ${employee.first_name}!`
              : "¡Se ha guardado correctamente el empleado!"
          }
          closeLabel="Aceptar"
          onClose={handleCloseDialog} //lo que hago al aceptar, elim el empleado
        ></Dialog>
      }
    </>
  );
};
