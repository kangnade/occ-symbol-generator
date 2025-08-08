import { Box, Flex, HStack, Link, VStack, Wrap } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="100%"
      justifyContent="center"
      alignItems="flex-start"
      py={4}
    >
      <Wrap
        justify="center"
        align="start"
        width={["100%", "80%", "60%", "40%", "30%"]}
        spaceX={[2, 4]} // Reduce horizontal spacing on mobile
      >
        <HStack align="start" spaceX={8}>
          <VStack align="start">
            <Link
              href="https://www.linkedin.com/in/nade-kang-a6636a248/"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={["xs", "sm"]}
            >
              About Me
              <LuExternalLink />
            </Link>
            <Link
              href="https://paypal.me/nadekang?locale.x=en_US&country.x=CA"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={["xs", "sm"]}
              display={["none", "flex"]} // Hidden on base (<sm), shown on sm and above
            >
              Sponsor Me
              <LuExternalLink />
            </Link>
            <Link
              href="https://github.com/kangnade/occ-symbol-generator/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={["xs", "sm"]}
            >
              About the Project
              <LuExternalLink />
            </Link>
          </VStack>
          <VStack align="end">
            <Link
              href="https://en.wikipedia.org/wiki/Option_symbol#:~:text=The%20OCC%20option%20symbol%20consists,C%2C%20for%20put%20or%20call"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={["xs", "sm"]}
            >
              What is OCC Code
              <LuExternalLink />
            </Link>
            <Link
              href="https://github.com/kangnade/occ-symbol-generator/blob/main/README.md#bulk-upload"
              target="_blank"
              rel="noopener noreferrer"
              fontSize={["xs", "sm"]}
              display={["none", "flex"]} // Hidden on base (<sm), shown on sm and above
            >
              How to use Bulk Upload
              <LuExternalLink />
            </Link>
          </VStack>
        </HStack>
      </Wrap>
    </Flex>
  );
};

export default Footer;
