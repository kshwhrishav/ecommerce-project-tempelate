import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

function ProductCard({
  id,
  productImageUrl,
  productName,
  unitCost,
  unitDiscount,
  description
}) {
  return (
    <Box>
      <Box>
        <Card sx={{ width: 300, overflow:'scroll' }}>
          <CardMedia
            component="img"
            height="200"
            image={productImageUrl}
            alt="Sample Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {productName}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {unitCost}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Button>Add to cart</Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ProductCard;
