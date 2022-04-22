import styled from "@emotion/styled";
import { ReactNode } from "react";
import SideNavBarContainer from "../organisms/my/SideNavBarContainer";

interface MyPageTemplateProps{
    children?: ReactNode;
    element: React.ReactNode;
}

const MyPageTemplate : React.FC<MyPageTemplateProps>= ({element}) =>{
    return(
        <Template>
            <SideNavBarContainer/>
            {element}
        </Template>
    );
}
const Template = styled.div`

`;

export default MyPageTemplate;