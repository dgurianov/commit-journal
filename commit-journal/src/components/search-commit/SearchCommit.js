
import { useSetRecoilState } from 'recoil';
import './SearchCommit.css';
import { commitStateBucket } from '../../state/cjournalState';
import AxiosClient from '../backend-client/AxiosClient';
import React, { useState } from 'react';



 

const SearchCommit = () => {
    const setCommitsBucket = useSetRecoilState(commitStateBucket);
    const [searchState, setSearchState] = useState("");

    const handleChange = (event) => {
        setSearchState(event.target.value);

    }

    const clickSearch = (event) => {
        console.log("Searching...");
        if(searchState === "") return;

        const searchCommitFromBackend = async () => {
            try{
                const {data} = await AxiosClient.get(`/api/v1/commit?q=${searchState}`,{headers: {"Content-Type": "application/json"}});
                console.log(data);
                setCommitsBucket([...data]);
            }catch (error){
                console.log(error);
            }
    
            // 
            // console.log(newCommit);
        }
        searchCommitFromBackend();
        
    
    
     }

    return(
        <React.Fragment >
            <div className="input-group input-group-sm mb-3 mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Text</span>
                <input type="text"  className="form-control"  onChange={handleChange} name="commitId" />
                <span className='mx-3'></span>
                <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={clickSearch}>Search</button>
            </div>
        </React.Fragment>
    );
    
}


export default SearchCommit;