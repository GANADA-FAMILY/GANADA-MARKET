import styled from "@emotion/styled";
import { ReactNode } from "react";
import LinkButton from "../../atoms/my/LinkButton";

interface MyHomeContainerProps{
    children? : ReactNode;
}
const MyHomeContainer : React.FC<MyHomeContainerProps> = ({children})=>{
    return (
        <div>
            <LinkButton href="/">프로필 수정</LinkButton>
            <LinkButton href="/">내 스타일</LinkButton>
        </div>
    );
}

const Container = styled.div`
    overflow: hidden;
    min-height: 380px;
`
const UserMemberShip = styled.div`
    
`
export default MyHomeContainer;