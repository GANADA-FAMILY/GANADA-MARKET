import userAction from 'api/userAPI';
import useAuth from 'hooks/useAuth';

function MyPurchase() {
  const { user, loading, dispatch } = useAuth();
  const getMyInfo = async () => {
    const res = await userAction.getUser();
    console.log(res);
  };
  const getAddressList = async () => {
    const { status, data } = await userAction.getAddressbook();
    console.log(status, data);
  };
  return (
    <div>
      {!loading && (
        <>
          <div>{JSON.stringify(user)}</div>
          <div>{loading}</div>
          <button type="button" onClick={getMyInfo}>
            가져오기
          </button>
          <button type="button" onClick={getAddressList}>
            가져오기2
          </button>
          <h1>{process.env.REACT_APP_API_URL}</h1>
          <p>{localStorage.getItem('token')}</p>
        </>
      )}
    </div>
  );
}

export default MyPurchase;
