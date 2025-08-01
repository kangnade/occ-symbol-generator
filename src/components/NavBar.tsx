import {
  HStack,
  IconButton,
  IconButtonProps,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { BsGithub, BsHeart } from "react-icons/bs";
import { defaultIconButtonProps } from "@/utilities/defaultIconButtonProps";
import ColorModeButton from "./ColorModeButton";

const NavBar = () => {
  // The padding size for both pl (paddingLeft) and pr (paddingRight)
  const paddingSize = "5";

  return (
    <Wrap justify="space-between" h="100%">
      <HStack paddingLeft={paddingSize}>
        <Text textStyle="4xl" fontWeight="bold" letterSpacing="0.1em">
          MoBoTools
        </Text>
      </HStack>
      <HStack paddingRight={paddingSize}>
        <IconButton {...defaultIconButtonProps} aria-label="Sponsor Heart">
          <BsHeart />
        </IconButton>
        <IconButton {...defaultIconButtonProps} aria-label="Github Icon">
          <BsGithub />
        </IconButton>
        <ColorModeButton />
      </HStack>
    </Wrap>
  );
};

export default NavBar;
