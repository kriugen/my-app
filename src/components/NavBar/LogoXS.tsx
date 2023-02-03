import { Typography } from "@mui/material";
import { Link } from "../UI";

export default function LogoXS({ title }: any) {
  return <Link sx={{
    color: 'white', 
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
  }}

  href='/'
  underline='none'
>
  <Typography
    variant="h5"
    noWrap
    sx={{
      mr: 2,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
    }}
  >
    {title}
  </Typography>
</Link>;
}