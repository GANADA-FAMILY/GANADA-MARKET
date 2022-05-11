import React from 'react';

interface TextProps {
  children: React.ReactNode;
}

function TextTag({ children, ...rest }: TextProps): JSX.Element {
  return <span style={{ ...rest }}>{children}</span>;
}

export default TextTag;
