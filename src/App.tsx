import { Box, ChakraProvider, Container, Flex, VStack } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { PokemonListPage } from "./pages/PokemonListPage";
import theme from "./styles/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Container
          maxW="container.xl"
          paddingY={[4, 4, 8]}
          paddingX={[8, 8, 16]}
          height="calc(100vh)"
        >
          <VStack align="stretch" spacing={8} width="100%" height="100%">
            <Header />
            <Box as="main" height="100%">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/demos/pokemon" element={<PokemonListPage />} />
              </Routes>
            </Box>
            <Footer />
          </VStack>
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
