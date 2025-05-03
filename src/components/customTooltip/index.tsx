import { Tooltip } from "@chakra-ui/react";
import { FaQuestionCircle } from 'react-icons/fa';

import { PlacementWithLogical } from "@chakra-ui/react";
import { InfoOutlineIcon, QuestionIcon } from "@chakra-ui/icons";

interface CustomTooltipProps {
  label: string;
  color?: string;
  size?: number;
  placement?: PlacementWithLogical;
}

function CustomTooltip({ label, color, size, placement = 'top' }: CustomTooltipProps) {
  return (
    <Tooltip
      label={label}
      placement={placement}
      bg="white"
      color="#52525B"
      fontSize="1em"
      hasArrow
    >
      <QuestionIcon className="cursor-help" color={color} boxSize={size} />
    </Tooltip>
  );
}

export default CustomTooltip;