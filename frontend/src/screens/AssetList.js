import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAssets } from "../actions/assetActions";

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
import { removeAsset } from "../actions/assetActions";
import { Dialog } from "../commons/Dialog";
import { PageTitle } from "../commons/PageTitle";

const columns = [
  { id: "id_asset", label: "ID", minWidth: 50, align: "center" },
  { id: "name", label: "Nombre", minWidth: 50, align: "center" },
  { id: "type", label: "Tipo", minWidth: 50, align: "center" },
  { id: "code", label: "Código", minWidth: 50, align: "center" },
  { id: "id_employee", label: "ID Empleado", minWidth: 50, align: "center" },
  {
    id: "actions",
    label: "Acciones",
    minWidth: 50,
    align: "center",
    component: (asset, viewAction, deleteAction) => (
      <>
        <IconButton aria-label="view" onClick={() => viewAction(asset)}>
          <Visibility />
        </IconButton>

        <IconButton aria-label="delete" onClick={() => deleteAction(asset)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];
export const AssetList = () => {
  // ------------ HOOKS ------------
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const assets = useSelector((state) => state.assetsSlice.assets);

  const totalAssets = useSelector((state) => state.assetsSlice.totalAssets);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [assetToDelete, setAssetToDelete] = useState();
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");

  const totalPaginas = useMemo(
    () => Math.ceil(totalAssets / rowsPerPage),
    [totalAssets, rowsPerPage]
  );

  useEffect(() => {
    dispatch(
      getAssets({
        page,
        limit: rowsPerPage,
        name: searchName,
        type: searchType,
        id_employee: searchEmployeeId,
      })
    );
  }, [dispatch, page, rowsPerPage, searchName, searchType, searchEmployeeId]);

  // ------------ FUNCTIONS ------------

  const handleChangePage = useCallback((_, newPage) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  const handleViewAction = useCallback(
    (asset) => navigate(`/asset/${asset.id_asset}`),
    [navigate]
  );

  const handleDeleteAction = useCallback(
    (asset) => setAssetToDelete(asset),
    []
  );

  const inputNameOnChange = (value) => setSearchName(value);
  const inputTypeOnChange = (value) => setSearchType(value);
  const inputEmployeeIdOnChange = (value) => setSearchEmployeeId(value);
  const handleAcceptDialog = useCallback(() => {
    dispatch(removeAsset(assetToDelete));
    setAssetToDelete();
  }, [dispatch, assetToDelete]);

  // ------------ RENDERS ------------

  return (
    <>
      <PageTitle>Gestor de Activos - Vortex IT</PageTitle>
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
            onChange={(event) => inputNameOnChange(event.target.value)}
          >
            {" "}
          </TextField>

          <TextField
            id="type-search"
            label="Búsqueda por Tipo"
            type="search"
            onChange={(event) => inputTypeOnChange(event.target.value)}
          >
            {" "}
          </TextField>

          <TextField
            id="employee-id-search"
            label="Búsqueda por ID de Empleado"
            type="search"
            onChange={(event) => inputEmployeeIdOnChange(event.target.value)}
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
              {totalAssets ? (
                assets.map((row) => (
                  <TableRow hover tabIndex={-1} key={row.id_asset}>
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
                    No hay activos disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalAssets}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={(paginationInfo) =>
            `${paginationInfo.from}–${paginationInfo.to} de ${paginationInfo.count} assets (${totalPaginas} páginas)`
          }
        />
      </Paper>

      {/* condic para eliminar empleado: setEmployee seteado para eliminar y haber aceptado  */}
      {assetToDelete && (
        <Dialog
          isOpen={true}
          title={`¿Desea eliminar el activo ${assetToDelete.name}?`}
          closeLabel="Cancelar"
          onClose={() => setAssetToDelete()}
          acceptLabel="Eliminar"
          onAccept={handleAcceptDialog}
        ></Dialog>
      )}
    </>
  );
};
