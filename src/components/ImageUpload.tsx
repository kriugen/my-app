import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function ImageUpload({ imageUrl, setImage }: any) {
  const [src, setSrc] = useState(imageUrl);

  return <>
      { 
        src && <Box
          component="img"
          sx={{
            maxWidth: 200,
            maxHeight: 150
          }}
          alt="The house from the offer."
          src={ src }
        />
      }
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
    <label htmlFor="post-image">
      <Button variant="outlined" component="span">
        Upload
      </Button>
    </label>
  </>

  // {(src || imageUrl) ?
  //   <Box
  //       component="img"
  //       sx={{
  //         maxWidth: 200,
  //         maxHeight: 150
  //       }}
  //       alt="The house from the offer."
  //       src={ src || imageUrl }
  //     />
  //     : <label htmlFor="post-image">
  //         <Box
  //           sx={{
  //             maxWidth: 200,
  //             maxHeight: 150
  //           }}
  //         >
  //           Upload Image
  //         </Box>
  //       </label>
  //   }
}