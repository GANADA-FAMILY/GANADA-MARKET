import { OrderHistory } from 'types/Entity/UserAPI';

function getSizeByStatus(orderHistory: OrderHistory[], status: number) {
  const filtered = orderHistory.filter((o) => o.status === status);
  if (filtered === undefined) return 0;
  return filtered.length;
}

export default getSizeByStatus;
