import { BsSun, BsMoon } from "react-icons/bs";
import { defaultIconButtonProps } from "@/utilities/defaultIconButtonProps";
import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

// Build our customized color mode toggle as button with react-icons

const ColorModeButton = () => {
  // Use the useColorMode state hook
  const { colorMode, toggleColorMode } = useColorMode();

  // We render BsMoon if colorMode === "dark", else BsSun
  return (
    <IconButton
      {...defaultIconButtonProps}
      aria-label="Color-Mode Button"
      onClick={toggleColorMode}
    >
      {colorMode === "dark" ? <BsMoon /> : <BsSun />}
    </IconButton>
  );
};

export default ColorModeButton;
