import userAPI from 'api/userAPI';
import { useAuth, useFetch } from 'hooks';

function MyPurchase() {
  const { user, loading, dispatch } = useAuth();
  const [data, error, isLoading] = useFetch({ api: userAPI.getBank });
  // const [data, errors, isLoading] = useFetch({ api: userAPI.getUser });
  const getMyInfo = async () => {
    const res = await userAPI.getUser();
    console.log(res);
  };

  console.log(data);
  return (
    <div>
      {!loading && !isLoading && (
        <>
          <div>{JSON.stringify(user)}</div>
          <div>{loading}</div>
          <button type="button" onClick={getMyInfo}>
            가져오기
          </button>

          <h1>{process.env.REACT_APP_API_URL}</h1>
          <p>{localStorage.getItem('token')}</p>
        </>
      )}
    </div>
  );
}

export default MyPurchase;
