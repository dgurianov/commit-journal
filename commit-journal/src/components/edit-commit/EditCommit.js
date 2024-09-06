
import { useRecoilState } from "recoil";
import { commitStateBucket, tagsStateBucket } from "../../state/cjournalState";
import AxiosClient from "../backend-client/AxiosClient";
import { useForm } from "react-hook-form";

const EditCommit = ({originalCommit,setShowEdit}) => {


    const [commitsBucket, setCommitsBucket] = useRecoilState(commitStateBucket);
    const [tagsBasket,setTagsBasket] = useRecoilState(tagsStateBucket);

    const {register, formState:{isDirty,},handleSubmit} = useForm({
            defaultValues: {
                "commitId": originalCommit.commitId,
            "userName": originalCommit.userName,
            "repoId": originalCommit.repoId,
            "tags": originalCommit.tags,
            "description": originalCommit.description
            }
        });

    const onSubmit = (formData) => {
        if(isDirty){
            const pushCommitToBackend = async () => {
                try{
                    const {data} = await AxiosClient.put('/api/v1/commit/',JSON.stringify([formData]),{headers: {
                        "Content-Type": "application/json"}});
                    console.log(data);
                    const newTags = new Set(tagsBasket);
                    data[0].tags.forEach(newTag => {
                        newTags.add(newTag.id);
                    });
                    setTagsBasket([...newTags]);
                    const survivals = commitsBucket.filter((commit)=>commit.commitId !==  formData.commitId); 
                    setCommitsBucket([...survivals,formData]);
                }catch (error){
                    console.log(error);
                }
        
            }
            pushCommitToBackend();
        }
        setShowEdit(0);
    }

    const handleCancel = () => {setShowEdit(0);}

    return(
        <form className="card mb-3 p-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group input-group-sm mb-3 mt-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Commit id</span>
                    <input type="text"  className="form-control"  readOnly={true}   {...register("commitId")}/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">User</span>
                <input type="text" className="form-control" id="userName" {...register("userName")} />
                <span className="input-group-text">@repo</span>
                <input type="text" className="form-control" id="repoId"{...register("repoId")}/>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Description</span>
                <textarea className="form-control"  id="description" {...register("description")} ></textarea>
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control" readOnly={true}  id="tags" {...register("tags")}/>
            </div>
            <div className='d-flex justify-content-center '>
                <button className='btn btn-light btn-sm border border-secondary'>Save</button>
                <span className="mx-1"></span>
                <button type='button' className='btn btn-light btn-sm border border-secondary' onClick={handleCancel}>Cancel</button>
            </div>

     </form>
     );
}

export default EditCommit;