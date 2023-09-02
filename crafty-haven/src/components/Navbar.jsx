import { MoonIcon, Search2Icon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Link,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import CraftyHaven from "../Image/CraftyHaven.png";
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        top={"0"}
        // width={"100%"}
        backgroundImage={"linear-gradient(pink, white, #FFEBFF)"}
        p={2}
        textAlign={"center"}
        m={"auto"}
      >
        <Flex justifyContent={"space-around"} mt={"7"}>
          <Box display={["none", "none", "block", "block"]}>
            <Link href="/">
              <Image
                mb={3}
                w={200}
                h={50}
                fontWeight={"bold"}
                src={CraftyHaven}
                alt="logo"
              />
            </Link>
          </Box>

          {/* //Chakra Menu drop down with hamberger Icons */}
          {/* <Menu>
            <MenuButton display={["block", "block", "none", "none"]}>
              <Box display={["block", "block", "none", "none"]}>
                <AiOutlineMenu fontWeight={"bold"} fontSize={"30px"} />
              </Box>
            </MenuButton>
            
            <MenuList position={'relative'} zIndex={'999'}>
            <MenuItem>
                <Box>
                  <Link href="/" fontWeight={"medium"} color={"gray"}>
                    Home
                  </Link>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Link href="/craftblog" fontWeight={"medium"} color={"gray"}>
                    Craft Blogs
                  </Link>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Link
                    href="/drawblog"
                    color={"#8C67E6"}
                    fontWeight={"medium"}
                  >
                    Drawing Blogs
                  </Link>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Link href="/product" fontWeight={"medium"} color={"gray"}>
                    Buy Products Online
                  </Link>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Link href="/about" fontWeight={"medium"} color={"#8C67E6"}>
                    About us
                  </Link>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Link href="/contact" color={"gray"} fontWeight={"medium"}>
                    Contact
                  </Link>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box>
                  <Flex>
                    <Input
                      type="text"
                      w="250px"
                      border="none"
                      borderBottom={"1px solid #8C67E6"}
                      borderRadius={"none"}
                    />
                    <Search2Icon ml="-6" mt="3" />
                  </Flex>
                </Box>
              </MenuItem>
            </MenuList>
          </Menu> */}

          {/* Drawer */}
          <Box>
            <Box display={["block", "block", "none", "none"]}>
              <AiOutlineMenu color="#8C67E6"
                onClick={onOpen}
                fontWeight={"bold"}
                fontSize={"30px"}
              />
            </Box>

            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent backgroundColor={"whitesmoke"}>
                <DrawerCloseButton
                  border={"none"}
                  mt={"2"}
                  backgroundColor={"#8C67E6"}
                />
                <DrawerHeader borderBottomWidth="1px" color={"gray"}>
                  Menu
                </DrawerHeader>
                <DrawerBody>
                  <Box mb={"20px"}>
                    <Link href="/" fontWeight={"medium"} color={"#8C67E6"}>
                      Home
                    </Link>
                  </Box>
                  <Box mb={"20px"}>
                    <Link
                      href="/craftblog"
                      fontWeight={"medium"}
                      color={"gray"}
                    >
                      Craft Blogs
                    </Link>
                  </Box>
                  <Box mb={"20px"}>
                    <Link
                      href="/drawblog"
                      color={"#8C67E6"}
                      fontWeight={"medium"}
                    >
                      Drawing Blogs
                    </Link>
                  </Box>
                  <Box mb={"20px"}>
                    <Link href="/product" fontWeight={"medium"} color={"gray"}>
                      Buy Products Online
                    </Link>
                  </Box>
                  <Box mb={"20px"}>
                    <Link href="/about" fontWeight={"medium"} color={"#8C67E6"}>
                      About us
                    </Link>
                  </Box>
                  <Box mb={"20px"}>
                    <Link href="/contact" color={"gray"} fontWeight={"medium"}>
                      Contact
                    </Link>
                  </Box>
                  {/* <Box mb={"6px"}>
                    <MdLightMode color="gray" />
                  </Box> */}
                  <Box mb={"20px"}>
                    <Flex>
                      <Input
                        type="text"
                        w="250px"
                        border="none"
                        borderBottom={"1px solid #8C67E6"}
                        borderRadius={"none"}
                      />
                      <Search2Icon color="#8C67E6" ml="-6" mt="3" />
                    </Flex>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>

          <Box pt="20px" display={["none", "none", "block", "block"]}>
            <Link href="/craftblog" fontWeight={"medium"} color={"gray"}>
              Craft Blogs
            </Link>
          </Box>

          <Box pt="20px" display={["none", "none", "block", "block"]}>
            <Link href="/drawblog" color={"#8C67E6"} fontWeight={"medium"}>
              Drawing Blogs
            </Link>
          </Box>

          <Box pt="20px" display={["none", "none", "block", "block"]}>
            <Link href="/product" fontWeight={"medium"} color={"gray"}>
              Buy Products Online
            </Link>
          </Box>

          <Box pt="20px" display={["none", "none", "block", "block"]}>
            <Link href="/about" fontWeight={"medium"} color={"#8C67E6"}>
              About us
            </Link>
          </Box>

          <Box pt="20px" display={["none", "none", "block", "block"]}>
            <Link href="/contact" color={"gray"} fontWeight={"medium"}>
              Contact
            </Link>
          </Box>

          <Box display={["none", "none", "block", "block"]}>
            <Flex>
              <Input
                type="text"
                w="250px"
                border="none"
                borderBottom={"1px solid #8C67E6"}
                borderRadius={"none"}
              />
              <Search2Icon color="#8C67E6" ml="-6" mt="3" />
            </Flex>
          </Box>

          <Button backgroundColor={'#8C67E6'} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon color={'black'}/>}
          </Button>

          <Button background={"#8C67E6"}>
            <Link href="/login">Login</Link>
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
