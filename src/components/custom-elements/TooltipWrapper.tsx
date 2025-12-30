import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function TooltipWrapper({
  children,
  content,
  disable = false,
}: {
  children: React.ReactNode;
  content: string;
  disable?: boolean;
}) {
  return (
    <>
      {disable ? (
        <p>{children}</p>
      ) : (
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            // className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm shadow-md animate-fade-in"
            className="max-w-sm whitespace-normal rounded-md bg-gray-800 px-3 py-1 text-xs text-white shadow-md"
            sideOffset={4}
          >
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

export default TooltipWrapper;

{
  /* <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
  <div className="max-w-xs bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md whitespace-normal text-center">
    {group?.description}
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
  </div>
</div> */
}
