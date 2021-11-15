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
import studentsDataset from "../datasets/student-alcohol.json";
import { generateTree, predict, TreeNode } from "../utils/decision-tree";

export const StudentAlcoholDemoPage: FC = () => {
  const treeDiagrambackgroundColor = useColorModeValue("gray.100", "gray.700");
  const treeBoxBorderColor = useColorModeValue("gray.300", "gray.600");
  const inputBackgroundColor = useColorModeValue("white", "gray.900");

  const [tree, setTree] = useState<TreeNode | null>(null);
  const [predictedValue, setPredictedValue] = useState<number | null>(null);
  const [studentToPredict, setStudentToPredict] = useState<string>("");
  const autoFilledStudent = {
    school: "GP",
    sex: "M",
    age: "15",
    address: "U",
    famsize: "GT3",
    pstatus: "T",
    medu: "higher",
    fedu: "higher",
    mjob: "services",
    fjob: "other",
    reason: "course",
    guardian: "mother",
    traveltime: "<15 min",
    studytime: "<15 min",
    failures: "0",
    schoolsup: "false",
    famsup: "true",
    paid: "false",
    activities: "true",
    nursery: "false",
    higher: "true",
    internet: "true",
    romantic: "false",
    famrel: "very good",
    freetime: "moderate",
    goout: "moderate",
    dalc: "very low",
    walc: "very low",
    health: "very good",
    absences: "4",
    g1: "10",
    g2: "13",
    g3: "14",
  };

  const toast = useToast();

  useEffect(() => {
    if (studentsDataset.length) {
      const decisionTree = generateTree(studentsDataset, "dalc", [
        "school",
        "sex",
        "age",
        "address",
        "famsize",
        "pstatus",
        "medu",
        "fedu",
        "mjob",
        "fjob",
        "reason",
        "guardian",
        "traveltime",
        "studytime",
        "failures",
        "schoolsup",
        "famsup",
        "paid",
        "activities",
        "nursery",
        "higher",
        "internet",
        "romantic",
        "famrel",
        "freetime",
        "goout",
        // "dalc",
        // "walc",
        "health",
        // "absences",
        // "g1",
        // "g2",
        // "g3",
      ]);

      setTree(decisionTree);
    }
  }, [studentsDataset]);

  const autoFillInput = async () => {
    setStudentToPredict(JSON.stringify(autoFilledStudent));
  };

  const predictAlcoholConsumption = async () => {
    if (tree && studentToPredict) {
      try {
        const jsonStudentToPredict = JSON.parse(studentToPredict);
        const predictedAlcoholConsumption = await predict(
          tree,
          jsonStudentToPredict as any
        );
        setPredictedValue(predictedAlcoholConsumption);
        toast({
          title: `Prediction: ${predictedAlcoholConsumption}`,
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
            Student alcohol consumption
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack mb={8} alignItems="center">
        <Link as={NavLink} to="/" _hover={{ color: "blue.400" }}>
          <ChevronLeftIcon boxSize="2rem" />
        </Link>
        <Heading as="h1">Student alcohol consumption demo</Heading>
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
            value={studentToPredict}
            onChange={(e) => setStudentToPredict(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              colorScheme="green"
              size="sm"
              icon={<ChevronRightIcon />}
              aria-label="Predict"
              onClick={predictAlcoholConsumption}>
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
          href="https://www.kaggle.com/prashant111/student-alcohol-consumption"
          textColor="blue.400">
          from Kaggle
        </Link>

        {tree && <TreeDiagram data={tree} initialDepth={10} />}
      </Box>
    </VStack>
  );
};
