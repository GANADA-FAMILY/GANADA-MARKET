import styled from "@emotion/styled";
import { CSSProperties, ReactNode } from "react";

interface MenuProps{
    children?: ReactNode;
    className?: string;
    mode?: string;
    style?: CSSProperties;
    title?: string;
}

function Menu({
    children,
    className,
    mode,
    style,
    title,
    ...rest
} : MenuProps){
    return (
    <Molecule
        className={className}
        style={{
            ...style,
        }}
        {...rest}
    >
        <MenuTitle>
            {title}
        </MenuTitle>
        <MenuList>
            {children}
        </MenuList>
    </Molecule>
    )
}
const Molecule = styled.div`
    
`
const MenuTitle = styled.strong`

`
const MenuList = styled.ul`
    list-style: none;
`
export default Menu;