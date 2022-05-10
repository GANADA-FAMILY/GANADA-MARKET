import styled from '@emotion/styled';
import theme from '../../../../styles/theme';

export interface TextProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  textAlign?: string;
  size?: number;
  strong?: boolean;
  inline?: boolean;
  lineHeight?: number;
}

function Text({ children, ...props }: TextProps) {
  return (
    <StyledText className={props.className} {...props}>
      {children}
    </StyledText>
  );
}

const StyledText = styled.p<TextProps>`
  font-size: ${(props) =>
    `${props.size !== undefined ? props.size / 10 : 1.4}rem`};
  line-height: ${(props) =>
    `${props.lineHeight !== undefined ? props.lineHeight / 10 : 1.4}rem`};
  color: ${(props) =>
    `${
      theme.color[props.color === undefined ? 'black' : props.color]
    } !important`};
  font-weight: ${(props) =>
    `${props.strong ? theme.fontWeight.bold : ''} !important`};
  display: ${(props) =>
    `${props.inline ? 'inline-block' : 'block'} !important`};
`;

Text.defaultProps = {
  className: '',
  color: 'black',
  textAlign: '',
  size: 14,
  strong: false,
  inline: false,
  lineHeight: 14,
  children: '',
};

export default Text;
