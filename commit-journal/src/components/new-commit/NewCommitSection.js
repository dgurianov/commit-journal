import { useState } from 'react';
import './NewCommitSection.css';
import AxiosClient from '../backend-client/AxiosClient';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { commitStateBucket, tagsStateBucket } from '../../state/cjournalState';

const NewCommitSection = () => {
    const [commitsBucket, setCommitsBucket] = useRecoilState(commitStateBucket);
    const [tagsBasket,setTagsBasket] = useRecoilState(tagsStateBucket);
    const [newCommit , setNewCommit] = useState({
            "commitId": null,
            "userName": null,
            "repoId": null,
            "tags": [],
            "description": null
    });


    const handleSubmit = (event) => {
        console.log(newCommit);
        console.log("")
        //event.preventDefault();

        const pushCommitToBackend = async () => {
            try{
                const {data} = await AxiosClient.put('/api/v1/commit/',JSON.stringify([newCommit]),{headers: {
                    "Content-Type": "application/json"}});
                console.log(data);
                const newTags = new Set(tagsBasket);
                data[0].tags.forEach(newTag => {
                    newTags.add(newTag.id);
                });
                setTagsBasket([...newTags]);
                setCommitsBucket([...commitsBucket,newCommit]);
            }catch (error){
                console.log(error);
            }
    
            // 
            // console.log(newCommit);
        }
        pushCommitToBackend();


    }

    const handleChange = (event) => {
        switch(event.target.name){
            case "commitId":
                newCommit.commitId = event.target.value;
                console.log("commitId");
                break;
            case "userName":
                newCommit.userName = event.target.value;
                console.log("userNAme");
                break;
            case "repoId":
                newCommit.repoId = event.target.value;
                console.log("repoId");
                break;
            case "descr":
                newCommit.description = event.target.value;
                console.log("descr");
                break;
            case "tags":
                newCommit.tags = event.target.value.split(" ").map((tagWord)=> {return {"id":tagWord}});
                console.log("tags");
                break;
            default:
                console.log("Not actionable switch value.");
                break;
        }
       

    }

    return(<div>
        <div className="input-group input-group-sm mb-3 mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Commit id </span>
                <input type="text"  className="form-control"  onChange={handleChange} name="commitId" />
        </div>
        <div className="input-group input-group-sm mb-3">
            <input type="text" className="form-control" placeholder="Username"  onChange={handleChange}  name="userName"/>
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" placeholder="Repository"   onChange={handleChange} name="repoId"/>
        </div>
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Description</span>
            <textarea className="form-control"  onChange={handleChange} name="descr" ></textarea>
        </div>
        <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control"  onChange={handleChange} name="tags" />
        </div>
        <div className='d-flex justify-content-end '>
            <button type='submit' className='btn btn-light btn-sm mb-3 border border-secondary' onClick={handleSubmit}>Add new</button>
        </div>
      </div>
      
   );
}


export default NewCommitSection;