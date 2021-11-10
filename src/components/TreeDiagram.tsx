import { FC } from "react";
import { TreeNode } from "../utils/decision-tree";
import Tree from "react-d3-tree";
import { Box } from "@chakra-ui/layout";
import { TreeDiagramNode } from "./TreeDiagramNode";
import { useColorModeValue } from "@chakra-ui/color-mode";

type Props = {
  data: TreeNode;
};

export const TreeDiagram: FC<Props> = ({ data }) => {
  const linkColor = useColorModeValue("dark", "light");

  return (
    <Box width="100%" height="100%">
      <Tree
        data={data}
        orientation="vertical"
        pathFunc="step"
        initialDepth={4}
        pathClassFunc={() => `diagram-tree-link ${linkColor}`}
        renderCustomNodeElement={(rd3tProps) => (
          <TreeDiagramNode {...rd3tProps} />
        )}
      />
    </Box>
  );
};
