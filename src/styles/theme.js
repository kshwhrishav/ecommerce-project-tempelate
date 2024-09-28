import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: "white"
          },
        },
      },
      MuiButton: {
        styleOverrides: {
            root: {
                backgroundColor: "white",
                color: "black",
            }
        }
      }
    },
  });

  export default theme;
  