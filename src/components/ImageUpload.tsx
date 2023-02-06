import { Box } from "@mui/material";
import { useState } from "react";

export default function ImageUpload({ 
  maxHeight = 150, 
  maxWidth = 200, 
  imageUrl, setImage 
}: any) {
  const [src, setSrc] = useState(imageUrl);

  return (
    <Box sx={{
      width: maxWidth,
      height: maxHeight,
      border: '1px dashed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
      }}
    >
      { src && 
        <Box
          component="img"
          sx={{
            maxWidth,
            maxHeight
          }}
          src={ src }
        /> }
      <input
        id='post-image'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
        }}
        type='file'
        onChange={(e: any) => {
          const fileUploaded = e.target.files[0];
          if (!fileUploaded) return;
          setImage(fileUploaded);
          setSrc(URL.createObjectURL(fileUploaded));
        }}
      />
    </Box>
  )
}