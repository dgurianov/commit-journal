
import { useRecoilState } from "recoil";
import { commitStateBucket, tagsStateBucket } from "../../state/cjournalState";
import AxiosClient from "../backend-client/AxiosClient";
import { useForm } from "react-hook-form";
import React from "react";

const EditCommit = ({originalCommit,setShowEdit}) => {


    const [commitsBucket, setCommitsBucket] = useRecoilState(commitStateBucket);
    const [tagsBasket,setTagsBasket] = useRecoilState(tagsStateBucket);

    const {register,
         formState:{isDirty,},
         handleSubmit,
         getValues,
         formState:{errors}} = useForm({
            defaultValues: {
                "commitId": originalCommit.commitId,
            "userName": originalCommit.userName,
            "repoId": originalCommit.repoId,
            "tags": originalCommit.tags.map((tagObj)=>{return tagObj.id}).join(' '),
            "description": originalCommit.description
            }
        });

    const onSubmit = (formData) => {
        if(isDirty){
            formData.tags = [...formData.tags.trim().split(/ +/).map((tagWord)=> {return {"id":tagWord}})];
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
            <div className="d-flex justify-content-start  mt-1">
            {errors.commitId && (<p className='text-danger small-text-size '>{`${errors.commitId.message}`}</p>)}  <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
             </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">User</span>
                    <input type="text" className="form-control" id="userName" {...register("userName",{
                    required: "Username is required", 
                    minLength: { value: 3, message: "Username at least 3 letters." },
                    maxLength: { value: 12, message: "Username no more than 12 letters." }
                    })}/>
                <span className="input-group-text">@repo</span>
                <input type="text" className="form-control" id="repoId"{...register("repoId",{
                    required: "Repository Id is required", 
                    minLength: { value: 3, message: "Repository Id at least 3 letters." },
                    maxLength: { value: 12, message: "Repository Id no more than 12 letters." }
                })} />
            </div>
            <div className="d-flex justify-content-start ">
                {errors.userName && (<p className='text-danger small-text-size '>{`${errors.userName.message}`}</p>)}
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                {errors.repoId && (<p className='text-danger small-text-size '>{`${errors.repoId.message}`}</p>)}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Description</span>
                <textarea className="form-control"  id="description" {...register("description")} ></textarea>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control" id="tags" {...register("tags",
                    {validate: (match) => {return Number(getValues("tags").trim().split(/ +/).filter(e=> e.length > 9)) === 0 || "Tags can be not more then 8 symbols long!" }}
                )}/>
            </div>
            <div>
                {errors.tags && (<p className='text-danger small-text-size '>{`${errors.tags.message}`}</p>)}
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