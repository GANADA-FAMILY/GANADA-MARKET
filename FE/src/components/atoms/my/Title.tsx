import styled from "@emotion/styled";
import { ReactNode } from "react";

interface TitleProps{
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

function Title({
    children,
    className,
    fontWeight,
    color,
    display = "block",
    textAlign,
    style,
    role,
    size = 14,
    ...rest} : TitleProps){
    return (
        <Atom
            style={{
                color: `${color}`,
                display: `${display}`,
                fontSize: `${size}px`,
            }}
        >{children}</Atom>
    );
}

const Atom = styled.strong`
    color : #000000;
    font-size : 18px;
`;

export default Title;