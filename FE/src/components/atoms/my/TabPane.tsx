import styled from "@emotion/styled";
import { ReactNode } from "react";

interface TabPaneProps{
    children?: ReactNode;
}

function TabPane({
    children,
    ...rest
} : TabPaneProps){
    return (
    <Molecule
        {...rest}
    >
        {children}
    </Molecule>);
}
const Molecule = styled.div`
    display: table-cell;
    text-align: center;
`

export default TabPane;