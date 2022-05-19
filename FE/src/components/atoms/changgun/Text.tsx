import styled, { css } from 'styled-components';

interface TextProps {
  children: string;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  bold?: boolean;
  hoverBold?: boolean;
  underLine?: boolean;
  pointer?: boolean;
  color?: 'dark' | 'light' | 'normal';
  styles?: string;
}

const fontColor = ({ color }: TextProps) => {
  switch (color) {
    case 'dark':
      return css`
        color: black;
      `;
    case 'light':
      return css`
        color: #efefef;
      `;
    default:
      return css`
        color: #555;
      `;
  }
};

const fontSize = ({ size }: TextProps) => {
  switch (size) {
    case 'xsmall':
      return css`
        font-size: 1.2rem;
      `;
    case 'small':
      return css`
        font-size: 1.5rem;
      `;
    case 'medium':
      return css`
        font-size: 1.8rem;
      `;
    case 'large':
      return css`
        font-size: 2.1rem;
      `;
    case 'xlarge':
      return css`
        font-size: 2.4rem;
      `;
    default:
      return css`
        font-size: 1.6rem;
      `;
  }
};

const fontWeight = ({ bold, hoverBold }: TextProps) => {
  if (bold) {
    if (hoverBold) {
      return css`
        font-weight: 600;
        &:hover {
          font-weight: 800;
        }
      `;
    }
    return css`
      font-weight: 600;
    `;
  }
  if (hoverBold) {
    return css`
      font-weight: 300;
      &:hover {
        font-weight: 500;
      }
    `;
  }
  return css`
    font-weight: 300;
  `;
};

const additionalStyles = ({ styles }: TextProps) => {
  if (styles) {
    return css`
      ${styles}
    `;
  }
  return '';
};

const StyledText = styled.p<TextProps>`
  border: none;
  background: none;
  ${fontColor}
  ${fontSize}
  ${fontWeight}
  text-decoration: ${(p) => (p.underLine ? 'underline' : '')};
  &:hover {
    cursor: ${(p) => (p.pointer ? 'pointer' : '')};
  }
  ${additionalStyles}
`;

Text.defaultProps = {
  onClick: () => null,
  size: 'medium',
  bold: false,
  underLine: false,
  pointer: false,
  hoverBold: false,
  color: 'normal',
  styles: '',
};

function Text({
  color,
  hoverBold,
  pointer,
  underLine,
  bold,
  size,
  styles,
  onClick,
  children,
}: TextProps) {
  return (
    <StyledText
      styles={styles}
      color={color}
      hoverBold={hoverBold}
      pointer={pointer}
      bold={bold}
      underLine={underLine}
      size={size}
      onClick={onClick}
    >
      {children}
    </StyledText>
  );
}

export { Text };
export type { TextProps };
