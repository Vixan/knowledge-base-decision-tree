import { IconButton } from "@chakra-ui/button";
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, HStack, Text } from "@chakra-ui/layout";
import { LinkOverlay } from "@chakra-ui/react";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Header: FC = () => {
  const { toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(SunIcon, MoonIcon);

  return (
    <Flex
      as="header"
      justify="space-between"
      alignContent="end"
      width="100%"
      alignItems="center">
      <LinkOverlay as={NavLink} to="/">
        <HStack alignItems="center">
          <Image src="/images/tree-logo.svg" boxSize="40px"></Image>
          <Text fontWeight="bold" fontSize="2xl" textColor="purple.400">
            Decision tree
          </Text>
        </HStack>
      </LinkOverlay>
      <IconButton
        aria-label="Theme"
        onClick={toggleColorMode}
        icon={<Icon />}></IconButton>
    </Flex>
  );
};
