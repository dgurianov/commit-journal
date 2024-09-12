
import { useSetRecoilState } from 'recoil';
import { commitStateBucket } from '../../state/cjournalState';
import AxiosClient from '../backend-client/AxiosClient';
import React, { useState } from 'react';

const SearchCommit = () => {
    const setCommitsBucket = useSetRecoilState(commitStateBucket);
    const [searchString, setSearchString] = useState("");
    const [reset, setReset] = useState(false);

    const handleChange = (event) => { setSearchString(event.target.value);}

    const clickSearch = (event) => {
        let backendQuery = "/";
        if(reset){
            setReset(false);
        }else{
            if(searchString === "") return;
            backendQuery = "?q="+searchString;
            setReset(true);
        }

        const searchCommitFromBackend = async () => {
            try{
                const {data} = await AxiosClient.get(`/api/v1/commit${backendQuery}`,{headers: {"Content-Type": "application/json"}});
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
                {reset ?  (<React.Fragment > <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={clickSearch}>Reset</button>   <span className='mx-1'></span></React.Fragment>) : (<div></div>) }
                <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={clickSearch}>Search</button>
            </div>
        </React.Fragment>
    );
    
}

export default SearchCommit;