import { Box, Typography } from "@mui/material";

const Form = ({ children, onSubmit, message }: any) => (
    <Box component="form" 
      onSubmit={onSubmit}
      noValidate
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: {
          xs: 1,
          sm: 1/2,
          md: 1/3,
        }
      }}
    >
      { message && <Typography sx={{ mb: 2 }}>{message}</Typography>}
      { children }
    </Box>
);

export default Form;