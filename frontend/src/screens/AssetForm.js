import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { addAsset, editAsset } from "../actions/assetActions";
import { Dialog } from "../commons/Dialog";
import { PageTitle } from "../commons/PageTitle";
import { Box, Button, Container, TextField } from "@mui/material";

const getEmptyAsset = () => ({
  id_asset: "",
  name: "",
  type: "",
  code: "",
  brand: "",
  description: "",
  purchase_date: "",
  id_employee: "",
});

export const AssetForm = () => {
  // ------------ HOOKS ------------
  const dispatch = useDispatch();

  const { id_asset } = useParams();

  const navigate = useNavigate();

  const formRef = useRef();

  const assets = useSelector((state) => state.assetsSlice.assets);

  const [asset, setAsset] = useState(getEmptyAsset());

  const [isEditing, setIsEditing] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id_asset) {
      const assetToEdit = assets.find((asset) => asset.id_asset === id_asset);
      if (assetToEdit) {
        setAsset({ ...assetToEdit });
        setIsEditing(false);
      }
    } else {
      setAsset(getEmptyAsset());
      setIsEditing(true);
    }
  }, [id_asset, assets]);

  // ------------ FUNCTIONS ------------
  const inputOnChange = useCallback(
    (key, value) =>
      setAsset({
        ...asset,
        [key]: value,
      }),
    [asset]
  );

  const handleAddNewAsset = useCallback(() => {
    if (formRef.current.reportValidity()) {
      dispatch(addAsset(asset));
      setIsDialogOpen(true);
    }
  }, [dispatch, asset]);

  const handleEditAsset = useCallback(() => {
    if (formRef.current.reportValidity()) {
      dispatch(editAsset(asset));
      setIsDialogOpen(true);
    }
  }, [dispatch, asset]);

  const handleCancel = useCallback(() => {
    setAsset(assets.find((asset) => asset.id_asset === id_asset));
    setIsEditing(false);
  }, [id_asset, assets]);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);

    if (id_asset) {
      setIsEditing(false);
    } else {
      navigate("/");
    }
  }, [id_asset, navigate]);

  // ------------ RENDERS ------------
  return (
    <>
      <PageTitle>
        {id_asset ? `ID del Activo: ${asset.id_asset}` : "Agregar Nuevo Activo"}
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
              value={asset.name}
              disabled={!isEditing}
              onChange={(event) =>
                // setEmployee({
                //   ...employee,
                //   ["first_name"]: event.target.value,
                // })
                inputOnChange("name", event.target.value)
              }
            />
            <TextField
              required
              label="Tipo"
              value={asset.type}
              disabled={!isEditing}
              onChange={(event) => inputOnChange("type", event.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <TextField
              label="Código"
              //type="number"
              value={asset.code}
              disabled={!isEditing}
              onChange={(event) => inputOnChange("code", event.target.value)}
            />
            <TextField
              required
              label="Marca"
              //type="text"
              value={asset.brand}
              disabled={!isEditing}
              onChange={(event) => inputOnChange("brand", event.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <TextField
              label="Descripción"
              type="text"
              value={asset.description}
              disabled={!isEditing}
              onChange={(event) =>
                inputOnChange("description", event.target.value)
              }
            />
            <TextField
              required
              label="Fecha de Compra"
              type="date"
              value={asset.purchase_date}
              disabled={!isEditing}
              onChange={(event) =>
                inputOnChange("purchase_date", event.target.value)
              }
              InputLabelProps={{ shrink: true }} //con esta prop label queda outline
            />
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <TextField
              required
              label="ID de Empleado"
              type="number"
              value={asset.id_employee}
              disabled={!isEditing}
              onChange={(event) =>
                inputOnChange("id_employee", event.target.value)
              }
            />
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {/* Save, edit or cancel buttons */}
            {id_asset ? (
              isEditing ? (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleEditAsset}
                  >
                    Guardar Activo
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
                  Editar Activo
                </Button>
              )
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleAddNewAsset}
              >
                Agregar Activo
              </Button>
            )}
          </div>
        </Box>
      </Container>

      <Dialog
        //inicializada en false
        isOpen={isDialogOpen}
        title={
          id_asset
            ? `¡Se ha editado correctamente el activo ${asset.name}!`
            : "¡Se ha guardado correctamente el activo!"
        }
        closeLabel="Aceptar"
        onClose={handleCloseDialog} //lo que hago al aceptar, elim el empleado
      ></Dialog>
    </>
  );
};
