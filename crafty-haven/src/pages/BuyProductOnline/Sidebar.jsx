import { Box, Button, Flex, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const Sidebar = () => {
  const [searchSort, setSearchSort] = useSearchParams();
  const [sort, setSort] = useState(searchSort.get("sort") || "");
  const [filter, setFilter] = useState("");
  const [rating, setRating] = useState([]);

  useEffect(() => {
    let params = {};
    sort && (params.order = sort);
    filter && (params.category = filter);
    rating.length > 0 && (params.rating = rating.join(","));
    setSearchSort(params);
  }, [sort, filter, rating]);

  return (
    <Box
      mt={"50px"}
      mb={"50px"}
      border={"1.5px solid teal"}
      p={4}
      borderRadius="md"
      boxShadow="md"
      w={"70%"}
    >
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="teal.600" mb={2}>
          Sort by Price
        </Text>
        <Select
          onChange={(e) => setSort(e.target.value)}
          colorScheme="teal"
          variant="outline"
          border={"1px solid teal"}
        >
          {/* <option value="">Sort by price</option> */}
          <option value="asc">Low To High</option>
          <option value="desc">High To Low</option>
        </Select>
      </Box>
      <Box mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="teal.600" mb={2}>
          Choose Category
        </Text>
        <Flex flexDirection="column">
          <label>
            <input
              onChange={(e) => setFilter(e.target.value)}
              value="art"
              type="radio"
              name="category"
            />

            <Text fontSize="md" ml={2}>
              Art
            </Text>
          </label>
          <label>
            <input
              onChange={(e) => setFilter(e.target.value)}
              value="craft"
              type="radio"
              name="category"
            />
            <Text fontSize="md" ml={2}>
              Craft
            </Text>
          </label>
        </Flex>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="teal.600" mb={2}>
          Filter by Rating
        </Text>
        <Flex>
          <Button
            onClick={() => setRating(["2.5"])}
            size="sm"
            colorScheme="teal"
            variant="outline"
            mr={2}
          >
            2.5
          </Button>
          <Button
            onClick={() => setRating(["3.5"])}
            size="sm"
            colorScheme="teal"
            variant="outline"
            mr={2}
          >
            3.5
          </Button>
          <Button
            onClick={() => setRating(["4.5"])}
            size="sm"
            colorScheme="teal"
            variant="outline"
          >
            4.5
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
