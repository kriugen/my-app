import { Avatar, Badge, Box } from "@mui/material";
import { styled } from '@mui/material/styles'

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const Comments = ({ post }: any) => {
  return post?.comments?.items.map((c: any) => 
    <Box key={c.id}>
      <Badge
        overlap='circular'
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        data-test='avatar'
      >
        <Avatar
          sx={{ width: 40, height: 40 }}
          src='/images/avatars/broken-link.png'
          alt={ c.createdBy }
        />
      </Badge>
      {c.createdBy}&nbsp;{c.createdAt}
      <Box>{c.message}</Box>
    </Box>)
};

export default Comments;