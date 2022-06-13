import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachmentItem from "./AttachmentItem";

export default function BlogItem({ blog }) {
  const [expanded, setExpanded] = React.useState(false);
  const [direction, setDirection] = React.useState("rotate(0deg)");
  const handleExpandClick = () => {
    if(expanded === true)
    setDirection("rotate(0deg)")
    else setDirection("rotate(180deg)")
    console.log(expanded, direction);
    setExpanded(!expanded);
  };

  return (
    <Card  sx={{ maxWidth: 'auto', marginBottom: '20px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={"Shrimp and Chorizo Paella"}
        subheader="September 14, 2016"
      />
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions
      style={{ width: 'auto'}}
      disableSpacing>
        
        <IconButton
       style={{ position: 'absolute', right: '30px', marginBottom: '30px'}}
          onClick={handleExpandClick}
          aria-label="settings"
        >
          <ExpandMoreIcon style={{transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",}} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         dasdasdas
        </CardContent>
      </Collapse>
    </Card>
  );
}
