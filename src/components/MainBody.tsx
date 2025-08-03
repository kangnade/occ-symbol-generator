import {
  Box,
  Field,
  Fieldset,
  HStack,
  Input,
  Text,
  Clipboard,
  ClipboardTrigger,
  IconButton,
} from "@chakra-ui/react";

const MainBody = () => {
  const horizontalPaddingSize = "10";
  const verticalPaddingSize = "2.5";
  const inputFieldWidth = "7rem";
  const fieldLabelFont = { fontWeight: "bold" };
  const sampleResult = "SPX     141122P00019500";

  return (
    <>
      <Box
        borderWidth="0.2rem"
        borderStyle="solid"
        borderColor="auto"
        padding="1rem"
      >
        <Fieldset.Root size="lg" alignItems="center">
          <Fieldset.Legend
            fontSize="1.5rem"
            fontWeight="bold"
            textAlign="center"
          >
            Option Symbol Code Details
          </Fieldset.Legend>
          <Text fontSize="1rem" fontWeight="bold" textAlign="center">
            Designed for investment bank professionals
          </Text>
          <Fieldset.Content width="50%">
            <HStack
              spaceX={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Option Root</Field.Label>
                <Input
                  name="optionRoot"
                  width={inputFieldWidth}
                  placeholder="SPX"
                />
              </Field.Root>
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Expiration Date</Field.Label>
                <Input
                  name="expirationDate"
                  placeholder="yymmdd"
                  width={inputFieldWidth}
                />
              </Field.Root>
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Call/Put</Field.Label>
                <Input name="callPut" placeholder="C" width={inputFieldWidth} />
              </Field.Root>
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Strike Price</Field.Label>
                <Input
                  name="strikePrice"
                  placeholder="19.75"
                  width={inputFieldWidth}
                />
              </Field.Root>
            </HStack>
          </Fieldset.Content>
          <Box
            bg="gray.300"
            width="20%"
            height="auto"
            textAlign="center"
            display="flex"
            justifyContent="space-between"
            borderRadius="sm"
            alignItems="center"
            paddingLeft={5}
          >
            <Text userSelect="text" whiteSpace="pre">
              {sampleResult}
            </Text>
            <Clipboard.Root value="TO BE REPLACED LATER">
              <ClipboardTrigger asChild>
                <IconButton variant="ghost" color="red.400">
                  <Clipboard.Indicator />
                </IconButton>
              </ClipboardTrigger>
            </Clipboard.Root>
          </Box>
        </Fieldset.Root>
      </Box>
    </>
  );
};

export default MainBody;
