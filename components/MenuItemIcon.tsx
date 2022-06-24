import React from "react";
import type { MenuItem } from "../models/Menu";

export type MenuItemIconProps = {
  item: MenuItem;
};

const MenuItemIcon = (props: MenuItemIconProps) => {
  const { item } = props;

  if (item.image) {
    return <img src={item.image.src} width="18" />;
  }
  if (item.paths && item.paths.length) {
    return (
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <g transform="scale(0.18)">
          {item.paths.map((path, index) => (
            <path
              key={index}
              d={path.d}
              fill={path.fill}
              stroke={path.stroke}
              transform={path.transform}
              // style={CssString(path.style || "")}
            />
          ))}
        </g>
      </svg>
    );
  }

  return <></>;
};

export default MenuItemIcon;
