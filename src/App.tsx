import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { PokemonListPage } from "./pages/PokemonListPage";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import { TopNavigation } from "./components/TopNavigation";

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
        <TopNavigation />
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
