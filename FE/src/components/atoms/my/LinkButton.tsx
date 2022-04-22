// /** @jsxImportSource @emotion/react */

import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface ButtonProps{
    children?: React.ReactNode;
    href : string;
}

const LinkButton : React.FC<ButtonProps>= ({children, href, ...rest}) => {
    return(
        <StyledLinkButton 
        to={{pathname : href,}}
        {...rest}
        >
            {children}
        </StyledLinkButton>
    )
};

const StyledLinkButton = styled(Link)`
    margin-top: 12px;
    -ms-flex-item-align: start;
    align-self: flex-start;
    height: 36px;
    line-height: 34px;
    border: 1px solid #d3d3d3;
    color: rgba(34,34,34,.8);
    font-size: 12px;
    letter-spacing: -.06px;
    padding: 0 14px;
    height: 34px;
    border-radius: 10px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
    text-align: center;
    color: rgba(34,34,34,.8);
    background-color: #fff;
    text-decoration: none;
`;

export default LinkButton;
