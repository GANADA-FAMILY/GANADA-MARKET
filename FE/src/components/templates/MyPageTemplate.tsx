import MyHomeContainer from "../organisms/my/MyHomeContainer";
import MyPurchaseContainer from "../organisms/my/MyPurchaseContainer";
import SideNavBarContainer from "../organisms/my/SideNavBarContainer";

const MyPageTemplate = () =>{
    return(
        <>
            <SideNavBarContainer/>
            <MyHomeContainer/>
            <MyPurchaseContainer/>
        </>
    );
}

export default MyPageTemplate;