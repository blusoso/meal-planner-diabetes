import React from "react";
import { ButtonStyled } from "./Button.styled";

export enum BUTTON_TYPE {
  NONE = "none",
  PRIMARY = "primary",
  PRIMARY_OUTLINE = "primary--outline",
  SECONDARY = "secondary",
  SECONDARY_OUTLINE = "secondary--outline",
}

export enum BUTTON_SIZE {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export type ButtonProps = {
  id?: string;
  className?: string;
  isSubmit?: boolean;
  type?: BUTTON_TYPE;
  label?: string;
  icon?: string | React.ReactNode;
  iconEnd?: string | React.ReactNode;
  width?: string;
  minWidth?: string;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
  children?: JSX.Element;
  onClick?: () => void;
};

const Button = ({
  id,
  className = "",
  isSubmit = false,
  label,
  type = BUTTON_TYPE.NONE,
  icon,
  iconEnd,
  width,
  minWidth,
  padding,
  fontSize,
  borderRadius,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <ButtonStyled
      id={id}
      type={isSubmit ? "submit" : "button"}
      className={`${
        icon || iconEnd ? "flex items-center" : ""
      } ${className} ${type}`}
      width={width}
      minWidth={minWidth}
      padding={padding}
      fontSize={fontSize}
      borderRadius={borderRadius}
      onClick={onClick}
    >
      {icon && <span className="mr-1 button__icon--start">{icon}</span>}
      {label || children}
      {iconEnd && <span className="ml-1 button__icon--end">{iconEnd}</span>}
    </ButtonStyled>
  );
};

export default Button;
