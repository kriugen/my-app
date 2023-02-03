import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import NavBar, { Item } from ".";
import { useAuthContext } from "../AuthContextProvider";

function NavBarContainer() {
    const router = useRouter();
    const { user } = useAuthContext();
    
    const itemSelected = (item: Item) => {
      switch (item) {
      case 'SignIn': router.push('/signin');
        break;
      case 'SignOut': Auth.signOut();
        break;
      case 'My Posts': router.push('/posts/my');
        break;
      case 'About': router.push('/about');
        break;
  
      default:
        throw new Error(`Unknown nav item ${item}`);
      }
    };
      
    return <NavBar 
      activeItemName={router.route.substring(router.route.indexOf('/') + 1)} 
      user={user} 
      itemSelected={itemSelected}
    />;
}

export default NavBarContainer;