import React from "react";
import CraftHome from "./CraftBlogHome/CraftHome";
import CraftMainContent from "./CraftBlogHome/CraftMainContent";
import { Box } from "@chakra-ui/react";
const CraftBlog = () => {
  return (
    <Box backgroundColor={'#E8E8E8'}>
      <CraftHome />
      <CraftMainContent />
    </Box>
  );
};

export default CraftBlog;
