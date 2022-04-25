import styled from "@emotion/styled";
import { ReactNode } from "react";

interface TabsProps{
    children?: ReactNode;
}

function Tabs({
    children,
    ...rest
} : TabsProps){
    return (
        <Molecule
            {...rest}
        >
            {children}
        </Molecule>
    );
}
const Molecule = styled.div`
    display : table;
    table-layout: fixed;
    width: 100%;
    background-color: #fafafa;
    border-radius: 12px;
`
export default Tabs;