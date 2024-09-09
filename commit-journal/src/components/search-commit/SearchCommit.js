
import { useSetRecoilState } from 'recoil';
import './SearchCommit.css';
import { commitStateBucket } from '../../state/cjournalState';
import AxiosClient from '../backend-client/AxiosClient';
import React, { useState } from 'react';



 

const SearchCommit = () => {
    const setCommitsBucket = useSetRecoilState(commitStateBucket);
    const [searchString, setSearchString] = useState("");

    const handleChange = (event) => { setSearchString(event.target.value);}

    const clickSearch = (event) => {
        if(searchString === "") return;

        const searchCommitFromBackend = async () => {
            try{
                const {data} = await AxiosClient.get(`/api/v1/commit?q=${searchString}`,{headers: {"Content-Type": "application/json"}});
                console.log(data);
                setCommitsBucket([...data]);
            }catch (error){
                console.log(error);
            }
    
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