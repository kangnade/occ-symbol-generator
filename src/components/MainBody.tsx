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
import { OptionData } from "@/utilities/optionDataForm";
import { useEffect, useState } from "react";
import { restrictStrikeInput } from "@/utilities/validateStrikePrice";

const MainBody = () => {
  const inputFieldWidth = "7rem";
  const fieldLabelFont = { fontWeight: "bold" };

  // Create a state hook, initiated with empty string using the form from OptionData,
  // to hold the option symbol code data from user input
  const [optionData, setOptionData] = useState<OptionData>({
    optionRoot: "",
    expirationDate: "",
    callPut: "",
    strikePrice: "",
    occSymbolCode: "",
  });

  // Create state hook variable to control the onFocus and onBlur of the <Input> fields
  // initiated with null with type of either string (for event.target.name) or null
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // handle the onFocus property of <Input> field when user types input
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setFocusedField(name);
    console.log(name);
  };

  // handle the onBlur property of <Input> field when user moves to next input field
  const handleBlur = () => {
    setFocusedField(null);
  };

  // Build a function that handles the input change within the <Input> element
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the name and the value from event target in the <Input> element triggered by onChange
    const { name, value } = e.target;
    // use a temporary variable to hold the value
    let userInputValue = value;

    switch (name) {
      case "optionRoot":
        // exrtact all up to 6 char value (<Input> field limited to 6)
        userInputValue = value.slice(0, 6);
        break;
      case "expirationDate":
        // expirationDate up to 6 char value (<input> field limited to 6)
        userInputValue = value.slice(0, 6);
        break;
      case "callPut":
        // callPut up to only 1 char, allow user to enter lower or upper case letters
        // convert all to upper case letters C or P
        userInputValue = value.slice(0, 1).toUpperCase();
        break;
      case "strikePrice":
        // use restrictStikeInput method to validate and then return the result of strike price part
        userInputValue = restrictStrikeInput(value);
        break;
    }

    // call the state hook method setOptionData to update the optionData hook var using prev parameter
    // defined in React state hook, update the specific key:value in the OptionData interface object
    // here update the prev (previous form of optionData, and set to the updated one specific to the
    // name: value pair)
    setOptionData((prev) => ({ ...prev, [name]: userInputValue }));
  };

  // Use the useEffect hook to generate the correct OCC option symbol code
  useEffect(() => {
    // Extract all data variables from the optionData hook
    const { optionRoot, expirationDate, callPut, strikePrice } = optionData;
    // Proceed generating OCC symbol code if all variables are not empty
    if (optionRoot && expirationDate && callPut && strikePrice) {
      // Parse strikePrice to float
      const strikePriceNum = parseFloat(strikePrice);
      if (!isNaN(strikePriceNum)) {
        const realStrikePrice = (strikePriceNum * 1000)
          .toString()
          .padStart(8, "0");
        const realOptionRoot = optionRoot.padEnd(6, " ");
        const occSymbolCode = `${realOptionRoot}${expirationDate}${callPut}${realStrikePrice}`;
        setOptionData((prev) => ({ ...prev, occSymbolCode }));
      } else {
        setOptionData((prev) => ({ ...prev, occSymbolCode: "" }));
      }
    } else {
      setOptionData((prev) => ({ ...prev, occSymbolCode: "" }));
    }
  }, [
    optionData.optionRoot,
    optionData.expirationDate,
    optionData.callPut,
    optionData.strikePrice,
  ]);

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
                  placeholder="SPX"
                  width={inputFieldWidth}
                  maxLength={6}
                  value={optionData.optionRoot}
                  onChange={handleInputChanges}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  borderColor={
                    focusedField === "optionRoot" ? "green.700" : undefined
                  }
                />
              </Field.Root>
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Expiration Date</Field.Label>
                <Input
                  name="expirationDate"
                  placeholder="yymmdd"
                  width={inputFieldWidth}
                  maxLength={6}
                  value={optionData.expirationDate}
                  onChange={handleInputChanges}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  borderColor={
                    focusedField === "expirationDate" ? "green.700" : undefined
                  }
                />
              </Field.Root>
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Call/Put</Field.Label>
                <Input
                  name="callPut"
                  placeholder="C"
                  width={inputFieldWidth}
                  maxLength={1}
                  value={optionData.callPut}
                  onChange={handleInputChanges}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  borderColor={
                    focusedField === "callPut" ? "green.700" : undefined
                  }
                />
              </Field.Root>
              <Field.Root alignItems="center">
                <Field.Label {...fieldLabelFont}>Strike Price</Field.Label>
                <Input
                  name="strikePrice"
                  placeholder="19.75"
                  width={inputFieldWidth}
                  value={optionData.strikePrice}
                  onChange={handleInputChanges}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  borderColor={
                    focusedField === "strikePrice" ? "green.700" : undefined
                  }
                />
              </Field.Root>
            </HStack>
          </Fieldset.Content>
          <Box
            bg="green.600"
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
              {optionData.occSymbolCode ||
                "Enter all fields correctly to generate code"}
            </Text>
            <Clipboard.Root value={optionData.occSymbolCode}>
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
