import { useColorModeValue } from "@chakra-ui/color-mode";
import { useToken } from "@chakra-ui/system";
import { FC } from "react";
import {
  CustomNodeElementProps,
  TreeNodeDatum,
} from "react-d3-tree/lib/types/common";
import { TreeNode } from "../utils/decision-tree";

type Props = CustomNodeElementProps & {
  nodeDatum: TreeNodeDatum & TreeNode;
  handleClick?: (treeNodeDatum: TreeNodeDatum) => void;
};

export const TreeDiagramNode: FC<Props> = ({
  nodeDatum,

  hierarchyPointNode,
  toggleNode,
  handleClick,
}) => {
  const [gray900, gray200, purple400, orange200, pink400] = useToken("colors", [
    "gray.900",
    "gray.200",
    "purple.400",
    "orange.200",
    "pink.400",
  ]);
  const nodeTextColor = useColorModeValue(gray900, gray200);

  return (
    <g>
      {!hierarchyPointNode.parent && (
        <circle
          r="15"
          stroke={nodeTextColor}
          fill={pink400}
          onClick={() => handleClick && handleClick(nodeDatum)}
        />
      )}
      {((!nodeDatum.isValue && hierarchyPointNode.parent) ||
        nodeDatum.__rd3t.collapsed) && (
        <circle
          r="15"
          stroke={nodeTextColor}
          fill={purple400}
          onClick={() => handleClick && handleClick(nodeDatum)}
        />
      )}
      {!nodeDatum.children?.length && (
        <circle
          r="15"
          stroke={nodeTextColor}
          fill={orange200}
          onClick={() => handleClick && handleClick(nodeDatum)}
        />
      )}

      <text
        fill={nodeTextColor}
        x="20"
        stroke="none"
        onClick={toggleNode}
        fontWeight="bold">
        {nodeDatum.name ?? "null"}
      </text>

      {nodeDatum.attributes &&
        Object.entries(nodeDatum.attributes).map(([key, value], i) => (
          <text key={key} fill={nodeTextColor} stroke="none" x="20" dy="20">
            {key}: {value?.toString()}
          </text>
        ))}
    </g>
  );
};
