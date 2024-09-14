
import { useSetRecoilState } from 'recoil';
import { commitStateBucket } from '../../state/cjournalState';
import AxiosClient from '../backend-client/AxiosClient';
import React, { useCallback, useState } from 'react';
import CONST from '../CONSTANTS';

const SearchCommit = () => {
    const setCommitsBucket = useSetRecoilState(commitStateBucket);
    const [searchString, setSearchString] = useState("");
    const [reset, setReset] = useState(false);

    const handleChange = (event) => { setSearchString(event.target.value);}

    const clickSearch = (event) => {
        let query = "/";
        if(reset){
            setReset(false);
        }else{
            if(searchString === "") return;
            query = "?q=" + searchString;
            setReset(true);
        }
        
        doSearch(query);
    };

    const doSearch = useCallback(
        async (searchQuery) => {
            try {
                const { data } = await AxiosClient.get(CONST.HTTP_COMMIT_RESOURCE + searchQuery);
                setCommitsBucket([...data]);
            } catch (error) {
                console.log(error);
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchString]
    );

    return(
        <React.Fragment >
            <div className="input-group input-group-sm mb-3 mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Text</span>
                <input type="text"  className="form-control"  onChange={handleChange} name="commitId"  data-testid="search-text"/>
                <span className='mx-3'></span>
                {reset ?  (<React.Fragment > <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={clickSearch}>Reset</button>   <span className='mx-1'></span></React.Fragment>) : (<div></div>) }
                <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={clickSearch}>Search</button>
            </div>
        </React.Fragment>
    );
    
}

export default SearchCommit;