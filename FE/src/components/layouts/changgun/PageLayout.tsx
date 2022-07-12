import styled from 'styled-components';
import { Header } from 'components/organisms/changgun';
import Footer from 'components/Footer';
import { TopModal } from 'components/layouts/changgun/TopModal';
import { Search } from 'components/organisms/changgun/Search';

interface PageLayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  margin-top: 10rem;
`;

function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <TopModal>
        <Search />
      </TopModal>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}

export { PageLayout };
