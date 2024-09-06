import { useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import ListOfCommits from './list-commits/ListOfCommits';
import NewCommitSection from './new-commit/NewCommitSection';
import SearchCommit from './search-commit/SearchCommit';
import { useEffect, useState } from 'react';
import { commitStateBucket, navBarState, tagsStateBucket } from '../state/cjournalState';
import ListOfTags from './list-tags/ListOfTags';
import NavigationStripe from './nav/NavigationStripe';
import AxiosClient from './backend-client/AxiosClient';

function App() {
const nbState = useRecoilValue(navBarState);
const setCommitsBucket = useSetRecoilState(commitStateBucket);
const setTagsBasket = useSetRecoilState(tagsStateBucket);
const [, setFetchState] = useState({
  isLoading: false,
  error: null,
});

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{fetchData()},[]);

const fetchData = () => {

  const loadCommitsFromBackend = async () => {
    try{
      const {data} = await AxiosClient.get('/api/v1/commit/');
      setCommitsBucket([...data]);
      const tagArraysFromAllCommits = data.map((commit)=>{return [...commit.tags]});
      const tagsToSaveToState = new Set();
      tagArraysFromAllCommits.forEach(
            (arrayOfTags)=>{
              arrayOfTags.forEach(
                (tagInCurrentArray)=>{
                              tagsToSaveToState.add(tagInCurrentArray.id)
                            }
                          )
                        }
                      );
      setTagsBasket([...tagsToSaveToState]);
      setFetchState({
        isLoading: false,
          });
          
    
    }catch(error){
          setFetchState({
            error,
            isLoading : false
        });
        console.log(error);
    }
  }

  loadCommitsFromBackend();
}
 
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-2'>
          <div className='app-logo'>logo</div>
        </div>
        <div className='col'>
          <NavigationStripe />
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <ListOfTags/>
         </div>
         <div className='col '>
            {nbState.search === "active" ? <SearchCommit/> :<NewCommitSection/>}
            <ListOfCommits/>
          </div>
      </div>
    </div>
  );
}

export default App;
