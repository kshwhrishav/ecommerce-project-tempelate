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
                color: "#0276aa",
                border: "2px solid #35baf6",
                padding: "10px"
            }
        }
      }
    },
  });

  export default theme;
  