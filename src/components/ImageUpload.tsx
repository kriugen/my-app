import { Box, Button } from "@mui/material";
import { useState } from "react";

export default function ImageUpload({ imageUrl, setImage }: any) {
  const [src, setSrc] = useState(imageUrl);

  return <>
      { 
        src ? <Box>
        <label htmlFor="post-image">
          <Box
            component="img"
            sx={{
              maxWidth: 200,
              maxHeight: 150
            }}
            alt="The house from the offer."
            src={ src }
          />
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
        </Box>
      : <Box>
        <input
          id='post-image'
          type='file'
          onChange={(e: any) => {
            const fileUploaded = e.target.files[0];
            if (!fileUploaded) return;
            setImage(fileUploaded);
            setSrc(URL.createObjectURL(fileUploaded));
          }}
        />
      </Box> }
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