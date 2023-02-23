import { Box, Button } from "@mui/material";

const ButtonRight = ({ props, children, onClick }: any) =>
  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    <Button {...props} onClick={onClick}>{children}</Button>
  </Box>;

export default ButtonRight;