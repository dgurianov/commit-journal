import { useRecoilValue } from 'recoil';
import Commit from './Commit';
import { filteredCommitsState } from '../../state/cjournalState';
import EditCommit from '../edit-commit/EditCommit';
import React, { useState } from 'react';

const ListOfCommits = () => {
    const commitsSelector = useRecoilValue(filteredCommitsState);
    const [showEdit, setShowEdit] = useState(0);

    return (
        <div className='container' >
            {commitsSelector.map((element)=>{
                return(
                    <React.Fragment key={element.id}>
                        {showEdit === element.commitId ?   <EditCommit key={element.id}  originalCommit={element} setShowEdit={setShowEdit}/>: <Commit setShowEdit={setShowEdit} key={element.id}  element={element}/>}
                        </React.Fragment>
                    ) ;
            })}
        </div>
    );
}

export default ListOfCommits;