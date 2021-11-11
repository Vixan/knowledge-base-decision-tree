import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import Tree from "react-d3-tree";
import { Orientation } from "react-d3-tree/lib/types/common";
import { TreeNode } from "../utils/decision-tree";
import { TreeDiagramNode } from "./TreeDiagramNode";

type Props = {
  data: TreeNode;
  initialDepth?: number;
};

export const TreeDiagram: FC<Props> = ({ data, initialDepth = 4 }) => {
  const linkColor = useColorModeValue("dark", "light");
  const [orientation, toggleOrientation] = useState<Orientation>("vertical");

  return (
    <Box width="100%" height="100%" position="relative">
      <Button
        alignItems="center"
        position="absolute"
        top={[20, 5]}
        right={5}
        colorScheme="purple"
        size="xs"
        value={orientation}
        onClick={() =>
          toggleOrientation(
            orientation === "vertical" ? "horizontal" : "vertical"
          )
        }>
        {orientation} mode
      </Button>
      <Tree
        data={data}
        orientation={orientation}
        pathFunc="step"
        initialDepth={initialDepth}
        pathClassFunc={() => `diagram-tree-link ${linkColor}`}
        renderCustomNodeElement={(rd3tProps) => (
          <TreeDiagramNode {...rd3tProps} />
        )}
      />
    </Box>
  );
};
