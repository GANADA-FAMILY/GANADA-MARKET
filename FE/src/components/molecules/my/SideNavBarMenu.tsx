import styled from "@emotion/styled";
import { ReactNode } from "react";

interface SideNavBarMenuProps{
    children?: ReactNode;
}
const SideNavBarMenu : React.FC<SideNavBarMenuProps>= ({children})=>{
    return(
        <SideNavBar>
            {children}
        </SideNavBar>
    );
}
const SideNavBar = styled.div`
    
`;

export default SideNavBarMenu; 