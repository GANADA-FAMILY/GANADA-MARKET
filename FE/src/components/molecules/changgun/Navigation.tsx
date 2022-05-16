import styled from 'styled-components';

const NavigationLayout = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5rem;
`;

interface NavigationProps {
  children: React.ReactNode;
}

function Navigation({ children }: NavigationProps) {
  return <NavigationLayout>{children}</NavigationLayout>;
}

export { Navigation };
