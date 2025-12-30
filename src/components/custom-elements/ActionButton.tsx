import { FC } from "react";
import TooltipWrapper from "./TooltipWrapper";

interface ActionButtonProps {
    tooltipContent: string;
    className: string;
    Icon: FC<any>;
    onClick?: () => void;
}

const ActionButton: FC<ActionButtonProps> = ({
    tooltipContent,
    className,
    Icon,
    onClick,
}) => {
    return (
        <TooltipWrapper content={tooltipContent}>
            <button
                onClick={onClick}
                className={className}
            >
                <Icon />
            </button>
        </TooltipWrapper>
    )
}

export default ActionButton;