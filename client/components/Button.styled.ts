import styled, { css } from "styled-components";

type BaseButtonProps = {
  padding?: string;
  width?: string;
  minWidth?: string;
  borderRadius?: string;
};

const BaseButton = ({
  padding,
  width,
  minWidth,
  borderRadius,
}: BaseButtonProps) => css`
  padding: ${padding || "0.375rem 1rem"};
  ${width && `width: ${width}`};
  ${minWidth && `min-width: ${minWidth}`};
  border-radius: ${({ theme }) => borderRadius || theme.borderRadiusMd};
`;

type ButtonStyledProps = {
  fontSize?: string;
} & BaseButtonProps;

export const ButtonStyled = styled.button<ButtonStyledProps>`
  font-size: ${({ fontSize, theme }) => fontSize || theme.smallFontSize};
  text-transform: capitalize;
  text-align: center;
  justify-content: center;

  &.primary {
    ${({ padding, minWidth, borderRadius, width }) =>
      BaseButton({ padding, minWidth, borderRadius, width })}
    color: white;
    background-color: ${({ theme }) => theme.greenColor};
  }

  &.primary--outline {
    ${({ padding, minWidth, borderRadius, width }) =>
      BaseButton({ padding, minWidth, borderRadius, width })}
    color:  ${({ theme }) => theme.greenColor};
    font-weight: 400;
    border: 1px solid ${({ theme }) => theme.greenColor};
  }

  &.secondary {
    ${({ padding, minWidth, borderRadius, width }) =>
      BaseButton({ padding, minWidth, borderRadius, width })}
    color: ${({ theme }) => theme.blackColor};
    border: 1px solid ${({ theme }) => theme.lightGrayColor};

    svg {
      fill: ${({ theme }) => theme.lightGrayColor} !important;
    }
  }

  &.secondary--outline {
    ${({ padding, minWidth, borderRadius, width }) =>
      BaseButton({ padding, minWidth, borderRadius, width })}
    color: ${({ theme }) => theme.grayColor};
    border: 1px solid ${({ theme }) => theme.lightGrayColor};
  }
`;
