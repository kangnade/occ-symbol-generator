import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import MainBody from "./components/MainBody";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Grid
      templateAreas={`"header" "main" "footer"`}
      gridTemplateRows={["60px 1fr 80px", "80px 1fr 100px", "100px 1fr 120px"]} // Header height: mobile, tablet, desktop
      gridTemplateColumns={"1fr"}
      // min-height={"100vh"} handling potential overflow
      minH="100vh"
      overflow={"auto"}
      p={2}
    >
      <GridItem area={"header"}>
        <NavBar />
      </GridItem>
      <GridItem area={"main"}>
        <MainBody />
      </GridItem>
      <GridItem area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default App;
