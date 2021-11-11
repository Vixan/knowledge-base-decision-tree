import { useColorModeValue } from "@chakra-ui/color-mode";
import { IconProps } from "@chakra-ui/icon";
import { HStack, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import React, { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
};

export const DemoItem: FC<Props> = ({ icon, title, description, link }) => {
  const demoItemBackgroundColor = useColorModeValue("gray.100", "gray.700");
  const demoItemHoverBackgroundColor = useColorModeValue(
    "gray.200",
    "gray.600"
  );
  const demoItemBorderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <LinkBox
      backgroundColor={demoItemBackgroundColor}
      borderRadius="xl"
      padding={6}
      borderWidth={1}
      borderColor={demoItemBorderColor}
      display="flex"
      alignItems="center"
      _hover={{
        backgroundColor: demoItemHoverBackgroundColor,
      }}>
      <HStack>
        {icon}
        <LinkOverlay as={NavLink} to={link}>
          <Text as="p" fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Text fontSize="normal">{description}</Text>
        </LinkOverlay>
      </HStack>
    </LinkBox>
  );
};
