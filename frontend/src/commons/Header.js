import { AppBar, Toolbar, IconButton, Button, Box } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import img from "../assets/static/Logo_Vortex.png";

export const Header = () => {
  // --------- HOOK ---------
  const navigate = useNavigate();

  // --------- FUNCTIONS ---------
  const handleOnClickHome = () => navigate("/");
  const handleOnClickForm = () => navigate("/employee");

  return (
    <Box>
      <AppBar position="static" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            component="div"
            onClick={handleOnClickHome}
          >
            <img src={img} alt="logo_vortex"></img>
          </IconButton>
          <Stack direction="row" spacing={2}>
            <Button onClick={handleOnClickHome} color="inherit">
              Inicio
            </Button>
            <Button onClick={handleOnClickForm} color="inherit">
              Nuevo Empleado
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
