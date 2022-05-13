import userAction from 'api/userAction';
import ResponseBody from 'types/ResponseBody';

function MyPurchase() {
  const getMyInfo = async () => {
    // userAction.getUser(
    //   '123',
    //   (res: any) => {
    //     console.log(res);
    //   },
    //   (err: any) => {},
    // );
    const asd = await userAction.getUser();
    console.log(asd);
  };
  const getAddressList = () => {
    userAction
      .getAddressbook()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <button type="button" onClick={getMyInfo}>
        가져오기
      </button>
      <button type="button" onClick={getAddressList}>
        가져오기2
      </button>
      <h1>{process.env.REACT_APP_API_URL}</h1>
      <p>{localStorage.getItem('token')}</p>
    </div>
  );
}

export default MyPurchase;
