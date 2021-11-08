import { useColorModeValue } from "@chakra-ui/color-mode";
import { FC } from "react";
import {
  CustomNodeElementProps,
  TreeNodeDatum,
} from "react-d3-tree/lib/types/common";

type Props = CustomNodeElementProps & {
  handleClick?: (treeNodeDatum: TreeNodeDatum) => void;
};

export const TreeDiagramNode: FC<Props> = ({
  nodeDatum,
  toggleNode,
  handleClick,
}) => {
  const nodeTextColor = useColorModeValue("#171923", "#E2E8F0");

  return (
    <g>
      <circle
        r="15"
        stroke={nodeTextColor}
        fill="#F6E05E"
        onClick={() => handleClick && handleClick(nodeDatum)}
      />
      <text fill={nodeTextColor} x="20" stroke="none" onClick={toggleNode} fontWeight="bold">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes &&
        Object.entries(nodeDatum.attributes)?.map(([key, value]) => (
          <text key={key} fill={nodeTextColor} stroke="none" x="20" dy="20">
            {key}: {value}
          </text>
        ))}
    </g>
  );
};
