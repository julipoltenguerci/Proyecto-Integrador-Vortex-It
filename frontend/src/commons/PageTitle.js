import { styled } from "@mui/material/styles";
import { Box, Paper, Stack } from "@mui/material";

const Title = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(4),
  textAlign: "center",
  fontSize: 20,
  color: "white",
  //theme.palette.text.secondary,
  fontWeight: "bold",
  backgroundColor: "#9C27B0",
}));

export const PageTitle = ({ children }) => (
  <Box sx={{ width: "100%" }}>
    <Stack spacing={2}>
      <Title>{children}</Title>
    </Stack>
  </Box>
);
