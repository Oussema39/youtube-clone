import { twMerge } from "tailwind-merge";
import { SmallSideBarItemProps } from "./SmallSideBarItem";
import { buttonStyles } from "./Button";
import { ElementType } from "react";

const LargeSidebarItem = ({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: Omit<SmallSideBarItemProps, "Icon"> & {
  isActive?: boolean;
  IconOrImgUrl: ElementType | string;
}) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full items-center rounded-lg gap-4 p-3 flex ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="h-6 w-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}

      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
};

export default LargeSidebarItem;
