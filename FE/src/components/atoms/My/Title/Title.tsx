import React from 'react';
import theme from '../../../../styles/theme';

interface TitleProps {
  children?: React.ReactNode;
  className?: string;
  fontWeight?: string;
  color?: string;
  display?: string;
  textAlign?: string;
  style?: string;
  size?: number;
  lineHeight?: number;
  level?: 1 | 2 | 3 | 4 | 5;
}
type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

function Title({
  children = '',
  className,
  fontWeight,
  color = 'black',
  display,
  textAlign,
  style,
  level,
  size = 14,
  lineHeight = 15,
  ...props
}: TitleProps) {
  const Tag = `h${level}` as TitleTag;
  return (
    <Tag
      style={{
        fontSize: `${size / 10}rem`,
        color: `${theme.color[color]}`,
        lineHeight: `${lineHeight / 10}`,
      }}
      className={className}
      {...props}
    >
      {children}
    </Tag>
  );
}

Title.defaultProps = {
  className: '',
  fontWeight: '',
  color: 'black',
  display: 'block',
  textAlign: 'center',
  style: '',
  level: 5,
  size: 14,
  lineHeight: 15,
};

export default Title;
