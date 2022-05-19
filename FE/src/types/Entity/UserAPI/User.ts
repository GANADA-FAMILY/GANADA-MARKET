import ProductHistory from './ProductHistory';

interface User {
  userEmail: string;
  userNickname: string;
  userPhone: string;
  profileImageUrl: string;
  grade: string;
  orderHistory: ProductHistory[];
  salesHistory: ProductHistory[];
}

export default User;
