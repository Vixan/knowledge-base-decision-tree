import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { TreeDiagram } from "../components/TreeDiagram";
import mobilePhonesDataset from "../datasets/mobile-phones.json";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";

export const MobilePhonesDemoPage: FC = () => {
  const treeDiagrambackgroundColor = useColorModeValue("gray.100", "gray.700");
  const treeBoxBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputBackgroundColor = useColorModeValue("white", "gray.900");

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [mobilePhoneToPredict, setMobilePhoneToPredict] = useState<string>("");
  const autoFilledMobilePhone = {
    battery_power: "915",
    blue: "no",
    dual_sim: "yes",
    fc: "4",
    four_g: "no",
    int_memory: "22",
    m_dep: "yes",
    mobile_wt: "174",
    n_cores: "5",
    pc: "12",
    px_height: "748",
    px_width: "1840",
    ram: "572",
    sc_h: "7",
    sc_w: "yes",
    talk_time: "10",
    three_g: "yes",
    touch_screen: "yes",
    wifi: "yes",
  };

  const toast = useToast();

  useEffect(() => {
    if (mobilePhonesDataset.length) {
      const decisionTree = generateTree(mobilePhonesDataset, "clock_speed", [
        "blue",
        "dual_sim",
        "fc",
        "four_g",
        "three_g",
        "touch_screen",
        "wifi",
      ]);

      setTree(decisionTree);
    }
  }, [mobilePhonesDataset]);

  const autoFillInput = async () => {
    setMobilePhoneToPredict(JSON.stringify(autoFilledMobilePhone));
  };

  const predictMobilePhoneValue = async () => {
    if (tree && mobilePhoneToPredict) {
      try {
        const jsonMobilePhoneToPredict = JSON.parse(mobilePhoneToPredict);
        const predictedMobilePhoneValue = await predict(
          tree,
          jsonMobilePhoneToPredict as any
        );
        setPredictedValue(predictedMobilePhoneValue);
        toast({
          title: `Prediction: ${predictedMobilePhoneValue}`,
          position: "top",
          isClosable: true,
          duration: null,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <VStack width="100%" alignItems="stretch" height="100%" spacing={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="#">Demos</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/demo/mobile-phones">
            Mobile phones
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack mb={8} alignItems="center">
        <Link as={NavLink} to="/" _hover={{ color: "blue.400" }}>
          <ChevronLeftIcon boxSize="2rem" />
        </Link>
        <Heading as="h1">Mobile phones demo</Heading>
      </HStack>
      <Box
        backgroundColor={treeDiagrambackgroundColor}
        borderColor={treeBoxBorderColor}
        borderWidth={1}
        borderRadius="xl"
        overflow="hidden"
        height="100%"
        width="100%"
        position="relative">
        <InputGroup
          size="md"
          position="absolute"
          top={5}
          left={5}
          backgroundColor={inputBackgroundColor}
          width="auto"
          borderRadius="xl">
          <InputLeftElement marginLeft={2} width="4rem">
            <Button size="xs" onClick={autoFillInput}>
              Autofill
            </Button>
          </InputLeftElement>
          <Input
            paddingLeft={20}
            placeholder="Paste JSON attributes"
            value={mobilePhoneToPredict}
            onChange={(e) => setMobilePhoneToPredict(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              colorScheme="green"
              size="sm"
              icon={<ChevronRightIcon />}
              aria-label="Predict"
              onClick={predictMobilePhoneValue}>
              Predict
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <Link
          position="absolute"
          right={5}
          bottom={2}
          fontSize="sm"
          href="https://www.kaggle.com/iabhishekofficial/mobile-price-classification"
          textColor="blue.400">
          from Kaggle
        </Link>

        {tree && <TreeDiagram data={tree} initialDepth={5} />}
      </Box>
    </VStack>
  );
};
