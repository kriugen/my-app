import { Typography } from "@mui/material";
import { Link } from "../UI";

export default function LogoMD({ title }: any) {
  return <Link sx={{
    color: 'white',
    display: { xs: 'none', md: 'flex' },
  }}
  href='/'
  underline='none'
>
  <Typography
    variant="h6"
    noWrap
    sx={{
      mr: 2,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'white',
      textDecoration: 'none',
    }}
  >
    {title}
  </Typography>
</Link>;
}