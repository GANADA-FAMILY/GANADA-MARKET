import styled from "@emotion/styled";

interface ListProps{
    items? : Array<any>,
    
}
function List({
    items = [],

}: ListProps){
    return (
    <Molecule
    >
        {items.length > 0 ? 
        <ListArea></ListArea> : 
        <EmptyArea>거래 내역이 없습니다.</EmptyArea>
        }
    </Molecule>)
}
const Molecule = styled.div`
    
`
const ListArea = styled.div`
    
`
const EmptyArea = styled.div`
    font-size: 13px;
    letter-spacing: -.07px;
    color: rgba(34,34,34,.5);
    text-align: center;
    padding: 80px 0;
`
export default List;