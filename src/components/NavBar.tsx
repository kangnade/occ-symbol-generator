import {
  HStack,
  IconButton,
  IconButtonProps,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { BsGithub, BsHeartFill } from "react-icons/bs";
import { defaultIconButtonProps } from "@/utilities/defaultIconButtonProps";
import ColorModeButton from "./ColorModeButton";

const NavBar = () => {
  // The padding size for both pl (paddingLeft) and pr (paddingRight)
  const paddingSize = "10";

  // handle on clicks for the icons
  const handleClick = (urlLink: string) => {
    window.open(urlLink, "_blank", "noopener,noreferrer");
  };

  return (
    <Wrap justify="space-between" h="100%">
      <HStack paddingLeft={paddingSize}>
        <Text textStyle="3xl" fontWeight="bold" letterSpacing="0.05em">
          OCC Symbol Code Generator
        </Text>
      </HStack>
      <HStack paddingRight={paddingSize} spaceX={1}>
        <IconButton
          {...defaultIconButtonProps}
          aria-label="Sponsor Heart"
          onClick={() =>
            handleClick(
              "https://paypal.me/nadekang?locale.x=en_US&country.x=CA"
            )
          }
          px={2}
        >
          <HStack>
            <Text>Sponsor</Text>
            <BsHeartFill color="red" />
          </HStack>
        </IconButton>
        <IconButton
          {...defaultIconButtonProps}
          aria-label="Github Icon"
          onClick={() => handleClick("https://github.com/kangnade")}
        >
          <BsGithub />
        </IconButton>
        <ColorModeButton />
      </HStack>
    </Wrap>
  );
};

export default NavBar;
