
import { useRecoilState } from "recoil";
import { commitStateBucket, tagsStateBucket } from "../../state/cjournalState";
import { useState } from "react";
import AxiosClient from "../backend-client/AxiosClient";

const EditCommit = ({originalCommit,setShowEdit}) => {


    const [commitsBucket, setCommitsBucket] = useRecoilState(commitStateBucket);
    const [tagsBasket,setTagsBasket] = useRecoilState(tagsStateBucket);
    const [newCommit , setNewCommit] = useState({
            "commitId": originalCommit.commitId,
            "userName": originalCommit.userName,
            "repoId": originalCommit.repoId,
            "tags": originalCommit.tags,
            "description": originalCommit.description
    });
    const [hasChanged, setHasChanged] = useState(false);


    const handleSubmit = (event) => {
        if(hasChanged){

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
                const survivals = commitsBucket.filter((commit)=>commit.commitId !==  newCommit.commitId); 
                setCommitsBucket([...survivals,newCommit]);
            }catch (error){
                console.log(error);
            }
    
            // 
            // console.log(newCommit);
        }
        pushCommitToBackend();
    }
        setShowEdit(0);
    


    }


    const handleCancel = () => {setShowEdit(0);}

    const handleChange = (event) => {
        switch(event.target.name){
            case "userName":
                newCommit.userName = event.target.value;
                console.log("userNAme");
                setHasChanged(true);
                break;
            case "repoId":
                newCommit.repoId = event.target.value;
                console.log("repoId");
                setHasChanged(true);
                break;
            case "descr":
                newCommit.description = event.target.value;
                console.log("descr");
                setHasChanged(true);
                break;
            case "tags":
                newCommit.tags = event.target.value.split(" ").map((tagWord)=> {return {"id":tagWord}});
                console.log("tags");
                setHasChanged(true);
                break;
            default:
                console.log("Not actionable switch value.");
                break;
        }

        setNewCommit({...newCommit});
       

    }

     return(
        <div className="card mb-3 p-2">
            <div className="input-group input-group-sm mb-3 mt-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Commit id</span>
                    <input type="text"  className="input-group-text"  readOnly={true}   value={newCommit.commitId}/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">User</span>
                <input type="text" className="form-control" placeholder="Username"  onChange={handleChange}  name="userName" value={newCommit.userName}/>
                <span className="input-group-text">@repo</span>
                <input type="text" className="form-control" placeholder="Repository"   onChange={handleChange} name="repoId" value={newCommit.repoId}  />
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Description</span>
                <textarea className="form-control"  onChange={handleChange} name="descr" value={newCommit.description} ></textarea>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control"  onChange={handleChange} name="tags" />
            </div>
            <div className='d-flex justify-content-center '>
                <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={handleSubmit}>Save</button>
                <span className="mx-1"></span>
                <button type='submit' className='btn btn-light btn-sm border border-secondary' onClick={handleCancel}>Cancel</button>
            </div>

     </div>
     );
}

export default EditCommit;