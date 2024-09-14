
import { useRecoilState } from "recoil";
import { commitStateBucket, tagsStateBucket } from "../../state/cjournalState";
import AxiosClient from "../backend-client/AxiosClient";
import { useForm } from "react-hook-form";
import React from "react";
import CONST from "../CONSTANTS";

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
                    const {data} = await AxiosClient.put(CONST.HTTP_COMMIT_RESOURCE + "/",JSON.stringify([formData]));
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
            {errors.commitId && (<p className='text-danger error-text-size '>{`${errors.commitId.message}`}</p>)}  <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
             </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">User</span>
                    <input type="text" className="form-control" id="userName" {...register("userName",{
                    required: CONST.USERNAME_REQUIRED_MESSAGE, 
                    minLength: { value: CONST.USERNAME_MIN_LENGTH, message: CONST.USERNAME_MIN_LENGTH_MESSAGE },
                    maxLength: { value: CONST.USERNAME_MAX_LENGTH, message: CONST.USERNAME_MAX_LENGTH_MESSAGE },
                    pattern:   { value: CONST.USERNAME_PATTERN ,   message: CONST.USERNAME_PATTERN_MESSAGE}
                    })}/>
                <span className="input-group-text">@repo</span>
                <input type="text" className="form-control" id="repoId"{...register("repoId",{
                    required: CONST.REPOID_REQUIRED_MESSAGE, 
                    minLength: { value: CONST.REPOID_MIN_LENGTH, message: CONST.REPOID_MIN_LENGTH_MESSAGE },
                    maxLength: { value: CONST.REPOID_MAX_LENGTH, message: CONST.REPOID_MAX_LENGTH_MESSAGE },
                    pattern:   { value: CONST.REPOID_PATTERN,   message: CONST.REPOID_PATTERN_MESSAGE}
                })} />
            </div>
            <div className="d-flex justify-content-start ">
                {errors.userName && (<p className='text-danger error-text-size '>{`${errors.userName.message}`}</p>)}
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                {errors.repoId && (<p className='text-danger error-text-size '>{`${errors.repoId.message}`}</p>)}
            </div>
            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text">Description</span>
                <textarea className="form-control"  id="description" {...register("description",{
                    required: CONST.DESCRIPTION_REQUIRED_MESSAGE, 
                    minLength: { value: CONST.DESCRIPTION_MIN_LENGTH, message: CONST.DESCRIPTION_MIN_LENGTH_MESSAGE },
                    maxLength: { value: CONST.DESCRIPTION_MAX_LENGTH, message: CONST.DESCRIPTION_MAX_LENGTH_MESSAGE },
                    pattern:   { value: CONST.DESCRIPTION_PATTERN,  message: CONST.DESCRIPTION_PATTERN_MESSAGE}
                })} ></textarea>
            </div>

            <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control" id="tags" {...register("tags",
                    {
                        pattern: {value: CONST.TAGS_PATTERN, message: CONST.TAGS_PATTERN_MESSAGE},
                        validate: (match) => { return Number(getValues("tags").trim().split(/ +/).filter(e=> e.length > 9)) === 0 || CONST.TAGS_MAX_LENGTH_MESSAGE }
                    }
                )}/>
            </div>
            <div>
                {errors.tags && (<p className='text-danger error-text-size '>{`${errors.tags.message}`}</p>)}
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