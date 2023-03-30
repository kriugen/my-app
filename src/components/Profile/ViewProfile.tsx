import {
  Box, Button,
  Card, CardActions,
  CardContent,
  Typography
} from "@mui/material";

export default function ViewProfile({ profile, onEdit }: any) {
  return <Card>
    <Box sx={{ display: 'flex', p: 5, alignItems: 'center' }}>
      <Typography gutterBottom variant="h5" component="div">
        {profile.firstName}&nbsp;{profile.lastName}
      </Typography>
    </Box>
    <CardContent sx={{ pt: 0 }}>
      <Typography gutterBottom variant="h5" component="div">
        {profile.DOB}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'end' }}>
      <Button onClick={onEdit}>Edit</Button>
    </CardActions>
  </Card >
}