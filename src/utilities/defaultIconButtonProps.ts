import { IconButtonProps } from "@chakra-ui/react";

// define a default IconButton property to avoid duplication
// Explicitly type defaultIconButtonProps to match IconButtonProps to avoid compiler error
export const defaultIconButtonProps: Partial<IconButtonProps> = {
  size: "lg" as const, // Use 'as const' to ensure literal type
  variant: "ghost",
};
