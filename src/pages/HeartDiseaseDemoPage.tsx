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
import heartDiseaseDataset from "../datasets/heart-disease.json";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";

export const HeartDiseaseDemoPage: FC = () => {
  const treeDiagrambackgroundColor = useColorModeValue("gray.100", "gray.700");
  const treeBoxBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputBackgroundColor = useColorModeValue("white", "gray.900");

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [predictedSex, setPredictedSex] = useState<number | null>(null);
  const [personDataToPredict, setPersonDataToPredict] = useState<string>("");
  const autoFilledPersonData = {
    age: 55,
    cp: 1,
    trestbps: 130,
    chol: 205,
    fbs: 0,
    restecg: 0,
    thalach: 172,
    exang: 0,
    oldpeak: 1.5,
    slope: 2,
    ca: 0,
    thal: 2,
    target: 1,
  };

  const toast = useToast();

  useEffect(() => {
    const dataset = heartDiseaseDataset.map((j) => ({
      ...j,
      sex: j.sex === 1 ? "male" : ("female" as string),
    }));

    if (heartDiseaseDataset.length) {
      const decisionTree = generateTree(dataset, "sex", [
        "age",
        "cp",
        "trestbps",
        "chol",
        "fbs",
        "restecg",
        "thalach",
        "exang",
        "oldpeak",
        "slope",
        "ca",
        "thal",
        "target",
      ]);

      setTree(decisionTree);
    }
  }, [heartDiseaseDataset]);

  const autoFillInput = async () => {
    setPersonDataToPredict(JSON.stringify(autoFilledPersonData));
  };

  const predictSex = async () => {
    if (tree && personDataToPredict) {
      try {
        const personData = JSON.parse(personDataToPredict);
        const predictedSex = await predict(tree, personData as any);
        setPredictedSex(predictedSex);
        toast({
          title: `Prediction: ${predictedSex}`,
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
          <BreadcrumbLink href="/demo/heart-disease">
            Heart disease
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack mb={8} alignItems="center">
        <Link as={NavLink} to="/" _hover={{ color: "blue.400" }}>
          <ChevronLeftIcon boxSize="2rem" />
        </Link>
        <Heading as="h1">Heart disease demo</Heading>
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
          borderRadius="xl"
          zIndex="2">
          <InputLeftElement marginLeft={2} width="4rem">
            <Button size="xs" onClick={autoFillInput}>
              Autofill
            </Button>
          </InputLeftElement>
          <Input
            paddingLeft={20}
            placeholder="Paste JSON attributes"
            value={personDataToPredict}
            onChange={(e) => setPersonDataToPredict(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              colorScheme="green"
              size="sm"
              icon={<ChevronRightIcon />}
              aria-label="Predict"
              onClick={predictSex}>
              Predict
            </IconButton>
          </InputRightElement>
        </InputGroup>
        <Link
          zIndex="2"
          position="absolute"
          right={5}
          bottom={2}
          fontSize="sm"
          href="https://www.kaggle.com/ronitf/heart-disease-uci"
          textColor="blue.400">
          from Kaggle
        </Link>

        {tree && <TreeDiagram data={tree} initialDepth={100} />}
      </Box>
    </VStack>
  );
};
