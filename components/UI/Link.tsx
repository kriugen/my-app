import { Link as MUILink } from '@mui/material';
import NextLink from 'next/link'
import { forwardRef } from 'react';
  
const LinkBehaviour = forwardRef(function LinkBehaviour({href, ...props}: any, ref: any) {
  return <NextLink href={href} ref={ref} {...props} />;
});

const Link = ({children, href, ...props}: any) => (
  <MUILink {...props} component={LinkBehaviour} href={href}>
    {children}
  </MUILink>
);

export default Link;