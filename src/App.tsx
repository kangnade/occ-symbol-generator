import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainBody from "./components/MainBody";

const App = () => {
  return (
    <Grid
      templateAreas={`"header" "main" "footer"`}
      gridTemplateRows={[
        "80px 1fr 120px",
        "100px 1fr 140px",
        "120px 1fr 160px",
      ]} // Header height: mobile, tablet, desktop
      gridTemplateColumns={"1fr"}
      // min-height={"100vh"} handling potential overflow
      minH="100vh"
      overflow={"auto"}
    >
      <GridItem area={"header"}>
        <NavBar />
      </GridItem>
      <GridItem area={"main"}>
        <MainBody />
      </GridItem>
      <GridItem area={"footer"} bg={"grey.300"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default App;
