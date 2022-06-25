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

  const blogContent = [];
  blog.texts.map((text) => {
    blogContent.push({
      type: 'T',
      content: text.content,
      order: text.order

    })
    
  })

  blog.attachments.map((attachment) => {
    blogContent.push({
      type: 'A',
      content: attachment.attachment,
      order: attachment.order

    })
  })

  blogContent.sort(function(b1, b2){return b1.order - b2.order})
  console.log(blogContent)
  const [expanded, setExpanded] = React.useState(true);
  const [direction, setDirection] = React.useState("rotate(0deg)");
  console.log(blog)
  const handleExpandClick = () => {
    if(expanded === true)
    setDirection("rotate(0deg)")
    else setDirection("rotate(180deg)")
    console.log(expanded, direction);
    setExpanded(true);
  };

  return (
    <Card  sx={{ maxWidth: '70%', marginBottom: '20px', marginLeft: '100px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.group.coach.userName.toUpperCase()[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={blog.heading}
        subheader="September 14, 2016"
      />
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         
        </Typography>
      </CardContent>
     
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
       {blogContent.map((bc) => (<p>{bc.type === 'A' ? <AttachmentItem attachment={bc.content}/> : <div>{bc.content}</div> }</p>))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
