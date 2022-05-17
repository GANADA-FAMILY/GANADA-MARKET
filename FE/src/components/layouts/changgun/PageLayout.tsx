import styled from 'styled-components';
import { Header } from 'components/organisms/changgun';
import Footer from 'components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  margin-top: 10rem;
`;

function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}

export { PageLayout };
