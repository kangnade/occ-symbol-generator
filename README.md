# MoBoTools: OCC Option Symbol Code Generator

MoBoTools stands for Middle Office/Back Office Tools. This is a collection of small functionality web-based Apps designed for investment bank professionals' day-to-day use.
When I worked at my previous firm, many of the business-as-usual tasks were manual heavy, and having such a web-based App would be great for efficiency.
However, most IT resources were used for bigger firm-wise projects. As a result, we struggled to find solutions for ourselves.
One of the issues was to create the OCC Option Symbol Code for asset transferring from one executing broker to another, and here we go, this is designed for this purpose.

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
- [Bulk Upload](#bulkupload)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About the Project

This project is dedicated to helping professional at medium and smaller investment banks, especially the Middle Office and Back Office employees, to quickly generate the OCC Option Symbol Code for use.

## Features

- Feature 1: Manual input fields for generating a single OCC Option Symbol Code, which can be done using keybords tab key, down/up arrow and enter keys.
- Feature 2: Bulk file upload for generating multiple lines of OCC Option Symbol Code that links to unique trade ID.

## Installation

Users can access the web App via: https://occ-code-generator.vercel.app/

## Bulk Upload

Below is a sample of the content of the standard file for upload:
- Col 1: tradeId is used for identifying the corresponding trade entry of the OCC Option Symbol Code; users could easily use VLookup in MS Excel to link a trade with its product's OCC Option Symbol Code
- Col 2: optionRoot is the root symbol of the underlying product
- Col 3: expirationDate is the expiration date of the option product, must be filled in the format of "yymmdd"
- Col 4: callPut is the Call/Put, the input can be either lower case or upper case C/P
- Col 5: strikePrice is the strike price of the option instrument

Save the below information in a csv file:
| tradeId  | optionRoot | expirationDate  | callPut | strikePrice |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| 1  | SPX  | 141122  | P  | 19.5  |
| 2  | LAMR  | 150117  | C  | 52.5  |
| 3  | AAPL7  | 131101  | C  | 470  |
| 4  | AAPL  | 131101  | C  | 470  |
| 5  | amzn  | 131101  | P  | 385  |

User should prepare the csv file in the above format for bulk upload.

## Contact

For any question, comment, or concerns, or request for new tools, please feel free to reach out to me via: kangnade@gmail.com

## Acknowledgement

Hope this may help my previous colleagues one day.
