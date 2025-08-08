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
  NativeSelect,
  FileUpload,
  Icon,
} from "@chakra-ui/react";
import { OptionData } from "@/utilities/optionDataForm";
import { useEffect, useState } from "react";
import { restrictStrikeInput } from "@/utilities/validateStrikePrice";
import { LuUpload } from "react-icons/lu";
import Papa from "papaparse";

// Build the row data shape of the upload files for creating occSymbolCode with bulk upload
interface RowData {
  tradeID?: string;
  optionRoot: string;
  expirationDate: string;
  callPut: string;
  strikePrice: string;
  occSymbolCode?: string;
}

const MainBody = () => {
  const inputFieldWidth = ["100%", "6rem", "7rem"]; // Full width on mobile, slightly reduced
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

  // Handle select value change for callPut field
  const handleSelectChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionData((prev) => ({ ...prev, callPut: e.target.value }));
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
        const realOptionRoot = optionRoot.toUpperCase().padEnd(6, " ");
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

  // Create a function for generating occSymbolCode using the rowData interface structure for upload files
  const generateOCCSymbolCode = (row: RowData): string => {
    // extract row information from the row of RowData interface structure
    const { optionRoot, expirationDate, callPut, strikePrice } = row;
    // Parse the strike price to float number
    const strike = parseFloat(strikePrice);
    // if missing strike price, return empty string
    if (isNaN(strike)) return "";

    // Otherwise if strike not empty, create real strike by multiplying the strike with 1000 and padd with starting 0s
    // up to 8 digits
    const paddedStrikePrice = (strike * 1000).toString().padStart(8, "0");
    // Pad the option root with trailing space up to 6 chars
    const paddedOptionRoot = optionRoot.toUpperCase().padEnd(6, " ");

    // return the occSymbolCode
    return `${paddedOptionRoot}${expirationDate}${callPut}${paddedStrikePrice}`;
  };

  // Create a function using papaparse library to handle onChang for the FieldUpload element
  // Operate on rows and generate occSymbolCode on each row under the column called occSymbolCode
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Retrieve the file from event.target.files' first file
    // If such file doesnt exist, simply return
    const file = event.target.files?.[0];
    if (!file) return;

    // Once the file is retrieved. We need to parse local files using Papa.parse(file, config):
    // We use interface type RowData
    Papa.parse<RowData>(file, {
      // In the configuration, we need header, complete, and skipEmptyLines properties to be defined
      header: true,
      skipEmptyLines: true,
      // define below callback function when parsing is complete. Complete receives parse result.
      complete: (result) => {
        const output = result.data.map((row) => ({
          ...row,
          occSymbolCode: generateOCCSymbolCode(row),
        }));

        // Once occSymbolCode is generated, we can convert it back to CSV format
        const csvFile = Papa.unparse(output);
        // Create a Blob and create the URL from the blob
        const blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
        const fileURL = URL.createObjectURL(blob);

        // Create a <a> anchor element that has href points to fileURL with attribute for download and download file name
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", "options_with_occ_codes.csv");
        // Append the link and triggers click to download, then remove the link for clean-up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    });
  };

  return (
    <>
      <Box
        borderWidth="0.2rem"
        borderStyle="solid"
        borderColor="auto"
        padding={["1", "2"]} // Reduced padding for mobile
      >
        <Fieldset.Root size="lg" alignItems="center">
          <Fieldset.Legend
            fontSize={["sm", "md", "1.5rem"]}
            fontWeight="bold"
            textAlign="center"
          >
            Option Symbol Code Details
          </Fieldset.Legend>
          <Text
            fontSize={["xs", "sm", "1rem"]}
            fontWeight="bold"
            textAlign="center"
          >
            Designed for investment bank professionals
          </Text>
          <Fieldset.Content width={["100%", "90%", "80%", "50%"]}>
            <HStack
              spaceX={["1", "2", "4"]}
              alignItems="center"
              justifyContent="space-between"
              flexWrap={["wrap", "nowrap"]} // Wrap on mobile, nowrap on sm+
              flexDirection={["column", "row"]} // Column on mobile, row on sm+
              gap={["1", "2"]} // Added gap for better spacing
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
                <NativeSelect.Root width={inputFieldWidth}>
                  <NativeSelect.Field
                    placeholder="CallPut"
                    value={optionData.callPut} // Controlled value
                    onChange={handleSelectChanges} // Update state on change
                  >
                    <option value="C">C</option>
                    <option value="P">P</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
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
                  maxLength={6} // Limit input length to prevent overflow
                />
              </Field.Root>
            </HStack>
          </Fieldset.Content>
          <Box
            bg="green.600"
            width={["100%", "80%", "60%", "40%"]} // Responsive widths across different devices
            height="auto"
            textAlign="center"
            display="flex"
            justifyContent="space-between"
            borderRadius="sm"
            alignItems="center"
            padding={["1", "2"]}
            mt={["1", "2"]}
            flexWrap="wrap" // allows wrapping on small screens
            gap={["1", "2"]} // adds spacing when wrapped
          >
            <Text
              userSelect="text"
              whiteSpace="pre"
              fontSize={["xs", "sm", "md"]}
            >
              {optionData.occSymbolCode ||
                "Enter all fields correctly to generate code"}
            </Text>
            <Clipboard.Root value={optionData.occSymbolCode}>
              <ClipboardTrigger asChild>
                <IconButton variant="ghost" color="red.400" size="sm">
                  <Clipboard.Indicator />
                </IconButton>
              </ClipboardTrigger>
            </Clipboard.Root>
          </Box>
        </Fieldset.Root>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={["2", "4"]}
        >
          <FileUpload.Root
            width={["100%", "80%", "60%", "40%", "30%"]}
            alignItems="center"
            maxFiles={1}
          >
            <FileUpload.HiddenInput onChange={handleFileUpload} accept=".csv" />
            <FileUpload.Dropzone>
              <Icon size={["md", "lg"]} color="fg.muted">
                <LuUpload />
              </Icon>
              <FileUpload.DropzoneContent>
                <Box fontSize={["xs", "sm"]}>Drag and drop files here</Box>
                <Box color="fg.muted" fontSize={["xs", "sm"]}>
                  .png, .jpg up to 5MB
                </Box>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.List />
          </FileUpload.Root>
        </Box>
      </Box>
    </>
  );
};

export default MainBody;
