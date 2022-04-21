import styled, { StyledComponent } from "@emotion/styled";
import { CSSProperties, ReactNode } from "react";

interface MenuProps{
    children?: ReactNode;
    className?: string;
    mode?: string;
    style?: CSSProperties;
    title: string;
    titleStyle?: any;
}

const Menu : React.FC<MenuProps>= ({
    children,
    className,
    mode,
    style,
    title,
    titleStyle,
    ...rest
})=>{
    return (
    <Molecule
        className={className}
        style={{
            ...style,
        }}
        {...rest}
    >
        <MenuTitle
            style={titleStyle}
        >
            {title}
        </MenuTitle>
        <MenuList
        >
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