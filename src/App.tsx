import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { PokemonListPage } from "./pages/PokemonListPage";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<PokemonListPage />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
