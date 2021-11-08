import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";

export const TopNavigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Box display="flex" justifyContent="right" alignContent="end" width="100%" padding="4">
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Box>
    </header>
  );
};
