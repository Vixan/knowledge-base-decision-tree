import { ChakraProvider, Container, VStack } from "@chakra-ui/react";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router";
import { TopNavigation } from "./components/TopNavigation";
import { PokemonListPage } from "./pages/PokemonListPage";
import theme from "./styles/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60,
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
          height="calc(100vh - 50px)"
        >
          <VStack align="stretch" spacing={8} width="100%" height="100%">
            <TopNavigation />
            <Routes>
              <Route path="/" element={<PokemonListPage />} />
            </Routes>
          </VStack>
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
