
import { useRecoilState } from 'recoil';
import './NavigationStripe.css'
import { navBarState } from '../../state/cjournalState';

const NavigationStripe = () => {
    const [nbState,setNavBarState] = useRecoilState(navBarState);
    
    

    const handleOnclick = (event) => {
            switch(event.target.name){
                case "search-nav":
                    setNavBarState({"search":"active", "add":""});
                    break;
                case "add-nav":
                    setNavBarState({ "search":"", "add":"active"});
                    break;
                default:
                    break;    

            }
    }

    return (<ul className="nav nav-tabs mt-3">
                <li className="nav-item">
                    <button className={"nav-link " + nbState.search}  onClick={handleOnclick} name="search-nav">Search</button>
                </li>
                <li className="nav-item">
                    <button className={"nav-link " + nbState.add} onClick={handleOnclick} name="add-nav">Add</button>
                </li>
            </ul>
        );

}

export default NavigationStripe;