import { Flex, HStack, Link, Text } from "@chakra-ui/layout";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Footer: FC = () => {
  return (
    <Flex
      as="footer"
      justify="center"
      alignContent="end"
      width="100%"
      alignItems="center"
    >
      <HStack spacing={1}>
        <Text fontSize="sm" color="gray.500">
          Made by
        </Text>
        <Link as={NavLink} to="https://github.com/Vixan" textColor="blue.400">
          Duca Vitalie-Alexandru
        </Link>
      </HStack>
    </Flex>
  );
};
