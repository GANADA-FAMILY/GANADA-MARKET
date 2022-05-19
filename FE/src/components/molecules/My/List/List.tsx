import styled from '@emotion/styled';
import Entity from 'types/Entity';

interface ListProps {
  dataSoruce: Entity[];
  // rowKey?: ((item: T) => React.Key) | keyof T;
  renderItem?: (item: Entity, index: number) => React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

function List({
  dataSoruce = [],
  renderItem = () => null,
  onClick = () => null,
  ...props
}: ListProps) {
  const myList = dataSoruce.map((item, index) => renderItem(item, index));
  return (
    <Molecule className={props.className} onClick={onClick}>
      {dataSoruce.length > 0 ? (
        <> {myList} </>
      ) : (
        <EmptyArea>해당 목록이 없습니다.</EmptyArea>
      )}
    </Molecule>
  );
}

List.defaultProps = {
  renderItem: () => null,
};

const Molecule = styled.li``;
const EmptyArea = styled.div`
  font-size: 13px;
  letter-spacing: -0.07px;
  color: rgba(34, 34, 34, 0.5);
  text-align: center;
  padding: 80px 0;
`;

export default List;
