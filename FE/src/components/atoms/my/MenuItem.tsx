import styled from "@emotion/styled";
import { ReactNode } from "react";

interface MenuItemProps{
    children? : ReactNode,
    className?: string,
    disabled?: boolean,
    key?: string,
}
const MenuItem : React.FC<MenuItemProps> = ({
    children,
    className,
    disabled,
    ...rest
})=>{
    return (<>
        <Atom
            className={className}
            {...rest}
        >
            {children}
        </Atom>
    </>);
}
const Atom = styled.li`

`
export default MenuItem;