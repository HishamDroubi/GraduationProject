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
import DeleteForever from "@mui/icons-material/DeleteForever";
import { MdAddChart, MdAddComment } from "react-icons/md";
import AttachmentItem from "../AttachmentItem";
import { asyncScheduler } from "rxjs";
import { deleteBlog } from "../../../features/group/groupDetailsSlice";
import { useDispatch } from "react-redux";
import { Select, MenuItem } from "@mui/material";
import moment from 'moment';
import Comments from './Comments/Comments'
export default function BlogItem({ blog }) {

  
  const dispatch = useDispatch();
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

  blogContent.sort(function (b1, b2) { return b1.order - b2.order })
  console.log(blogContent)
  const [expanded, setExpanded] = React.useState(false);
  const [direction, setDirection] = React.useState("rotate(0deg)");
  console.log(blog)
  const handleExpandClick = () => {
    if (expanded === true)
      setDirection("rotate(0deg)")
    else setDirection("rotate(180deg)")

    setExpanded(!expanded);
  };
console.log(localStorage.getItem('user'))
  const deleteBlogHandler = async (id) => {
    const data = { blogId: id };
    console.log(id);
    await dispatch(deleteBlog(data));
    console.log("dsadsad")
    
  };
  console.log(blog.group.coach._id);
  return (
    < >
      <Card className="border w-3/4 mt-10  bg-gray-800  rounded shadow-2xl relative">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {blog.group.coach ? blog.group.coach.userName.toUpperCase()[0] : ''}
            </Avatar>
          }
          action={


            <IconButton onClick={() => deleteBlogHandler(blog._id)}>
              <DeleteForever />
            </IconButton>


          }
          title={blog.heading}
          subheader={`${blog.group.coach.userName}, ${moment(new Date(blog.createdAt)).fromNow()}`}
        />


        <hr />
        <CardContent>
          {blogContent.map((bc) => (<p>{bc.type === 'A' ? <AttachmentItem attachment={bc.content} /> : <div>{bc.content}</div>}</p>))}
        </CardContent>

        <div className="absolute right-0 bottom-0"><IconButton onClick={handleExpandClick}><MdAddComment /></IconButton></div>
      </Card>

      <Collapse className="border w-3/4 mt-3 rounded" in={expanded} timeout="auto" unmountOnExit>
        <Comments blog={blog}/>
      </Collapse>

    </>
  );
}
