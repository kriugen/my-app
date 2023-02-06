import { Box } from "@mui/material";
import { useState } from "react";

export default function ImageUpload({ imageUrl, setImage }: any) {
  const [src, setSrc] = useState(imageUrl);

  const maxHeight = 150;
  const maxWidth = 200;

  return <>
      { 
        src ? <>
        <label
          htmlFor="post-image">
          <Box sx={{ 
              width: maxWidth, 
              height: maxHeight, 
              border: '1px dashed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Box
              component="img"
              sx={{
                maxWidth,
                maxHeight
              }}
              alt="The house from the offer."
              src={ src }
            />
          </Box>
          </label>
          <input
            style={{display: 'none'}}
            id='post-image'
            type='file'
            onChange={(e: any) => {
              const fileUploaded = e.target.files[0];
              if (!fileUploaded) return;
              setImage(fileUploaded);
              setSrc(URL.createObjectURL(fileUploaded));
            }}
          />
        </>
      : <Box>
        <button style={{ 
          border: '1px dashed',
          height: maxHeight,
          width: maxWidth,
          position: 'relative' as const,
        }}>
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
        </button>
      </Box> }
  </>
}