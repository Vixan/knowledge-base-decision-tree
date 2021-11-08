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
    <Box width="100vw" height="100vh">
      <Tree
        data={data}
        orientation="vertical"
        separation={{ siblings: 1 }}
        pathFunc="step"
        pathClassFunc={() => `diagram-tree-link ${linkColor}`}
        renderCustomNodeElement={(rd3tProps) => (
          <TreeDiagramNode {...rd3tProps} />
        )}
      />
    </Box>
  );
};
