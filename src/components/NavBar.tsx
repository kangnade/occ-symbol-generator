import {
  HStack,
  IconButton,
  IconButtonProps,
  Show,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { BsGithub, BsHeartFill } from "react-icons/bs";
import { defaultIconButtonProps } from "@/utilities/defaultIconButtonProps";
import ColorModeButton from "./ColorModeButton";

// handle on clicks for the icons
export const handleLinkClick = (urlLink: string) => {
  window.open(urlLink, "_blank", "noopener,noreferrer");
};

const NavBar = () => {
  // The padding size for both pl (paddingLeft) and pr (paddingRight)
  const paddingSize = ["1", "2"]; // add padding reduction for mobile device

  return (
    <Wrap justify="space-between" w="100%" p={paddingSize}>
      <HStack paddingLeft={paddingSize}>
        <Text
          fontSize={["sm", "md", "2xl"]}
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          OCC Symbol Code Generator
        </Text>
      </HStack>
      <HStack
        paddingRight={paddingSize}
        spaceX={["0", "1"]}
        wrap="wrap" // Wrap on small screens
        justify="flex-end"
        flexDirection={["column", "row"]} // Stack vertically on mobile
      >
        <IconButton
          {...defaultIconButtonProps}
          aria-label="Sponsor Heart"
          onClick={() =>
            handleLinkClick(
              "https://paypal.me/nadekang?locale.x=en_US&country.x=CA"
            )
          }
          px={["1", "2"]} // Reduced padding on mobile
          display={["none", "flex"]} // Hidden on base (<sm), shown on sm and above
        >
          <HStack>
            <Text fontSize={["xs", "sm"]}>Sponsor</Text>
            <BsHeartFill color="red" />
          </HStack>
        </IconButton>
        <IconButton
          {...defaultIconButtonProps}
          aria-label="Github Icon"
          onClick={() => handleLinkClick("https://github.com/kangnade")}
          display={["none", "flex"]} // Hidden on base (<sm), shown on sm+
        >
          <BsGithub />
        </IconButton>
        <ColorModeButton />
      </HStack>
    </Wrap>
  );
};

export default NavBar;
