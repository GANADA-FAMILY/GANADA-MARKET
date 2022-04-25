import styled from "@emotion/styled";
import { ReactNode } from "react";

interface TextProps{
    children?: ReactNode;
    className?: string;
    fontWeight? : string;
    color?: string;
    display?: string;
    textAlign?: string;
    style?: string;
    role?: string;
    size?: number;
}

function Text({
    children,
    className,
    fontWeight,
    color,
    display = "block",
    textAlign,
    style,
    role,
    size = 14,
    ...rest
}: TextProps){
    return (
        <Atom
            style={{
                color: `${color}`,
                display: `${display}`,
                fontSize: `${size}px`,
                ...rest,
            }}

            // {...rest}
        >{children}</Atom>
    );
}

const Atom = styled.span`
    font-size : 14px;
`;

export default Text;