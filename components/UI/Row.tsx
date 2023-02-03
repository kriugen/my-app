import { Box } from "@mui/material";

const Row = ({ children }: any) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 1 }}>
        { children }
    </Box>
);

export default Row;