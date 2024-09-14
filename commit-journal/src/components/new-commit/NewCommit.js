import './NewCommit.css';
import AxiosClient from '../backend-client/AxiosClient';
import { useRecoilState } from 'recoil';
import { commitStateBucket, navBarState, tagsStateBucket } from '../../state/cjournalState';
import { useForm } from 'react-hook-form';
import React from 'react';
import CONST from '../CONSTANTS';

/*
Uncomment for devtool
import { DevTool } from '@hookform/devtools';
*/

const NewCommitSection = () => {
    const [nbState, setNbState] = useRecoilState(navBarState);
    const [commitsBucket, setCommitsBucket] = useRecoilState(commitStateBucket);
    const [tagsBasket,setTagsBasket] = useRecoilState(tagsStateBucket);
    const {register,
        /*Uncomment for DevTool
         control, 
         */
        handleSubmit,
        getValues,
        formState:{errors}} = useForm();

    const onSubmit = (formData) => {
        formData.tags = [...formData.tags.trim().split(/ +/).map((tagWord)=> {return {"id":tagWord}})];

        const pushCommitToBackend = async () => {
            
            try{
                const {data} = await AxiosClient.put(CONST.HTTP_COMMIT_RESOURCE + "/",JSON.stringify([formData]));
                const newTags = new Set(tagsBasket);
                data[0].tags.forEach(newTag => {
                    newTags.add(newTag.id);
                });
                setTagsBasket([...newTags]);
                setCommitsBucket([...commitsBucket,formData]);
            }catch (error){
                console.log(error);
            }
        }

        pushCommitToBackend();
        //Set search active again to trigger rerender and hide New Commit section
        setNbState({...nbState,"search":"active"});
    }

    const handleCancel = () => {setNbState({...nbState,"search":"active"});}


    return(<React.Fragment>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group input-group-sm  mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Commit id </span>
                <input type="text" id="commitId" className="form-control" {...register("commitId",{
                    required: CONST.COMMITID_REQUIRED_MESSAGE, 
                    minLength: { value:CONST.COMMITID_MIN_LENGTH, message: CONST.COMMITID_MIN_LENGTH_MESSAGE},
                    maxLength: { value: CONST.COMMITID_MAX_LENGTH, message: CONST.COMMITID_MAX_LENGTH_MESSAGE },
                    pattern:   { value: CONST.COMMITID_PATTERN ,   message: CONST.COMMITID_PATTERN_MESSAGE}
                       }) }/>
               
        </div>
        <div className="d-flex justify-content-start  mt-1">
            {errors.commitId && (<p className='text-danger error-text-size '>{`${errors.commitId.message}`}</p>)}  <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div className="input-group input-group-sm ">
            <input type="text" className="form-control" placeholder="Username"  id="userName" {...register("userName",{
                required: CONST.USERNAME_REQUIRED_MESSAGE, 
                minLength: { value: CONST.USERNAME_MIN_LENGTH, message: CONST.USERNAME_MIN_LENGTH_MESSAGE },
                maxLength: { value: CONST.USERNAME_MAX_LENGTH, message: CONST.USERNAME_MAX_LENGTH_MESSAGE },
                pattern:   { value: CONST.USERNAME_PATTERN ,   message: CONST.USERNAME_PATTERN_MESSAGE}
                   }) }/>
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" placeholder="Repository"   id="repoId"  {...register("repoId",{
                required: CONST.REPOID_REQUIRED_MESSAGE, 
                minLength: { value: CONST.REPOID_MIN_LENGTH, message: CONST.REPOID_MIN_LENGTH_MESSAGE },
                maxLength: { value: CONST.REPOID_MAX_LENGTH, message: CONST.REPOID_MAX_LENGTH_MESSAGE },
                pattern:   { value: CONST.REPOID_PATTERN,   message: CONST.REPOID_PATTERN_MESSAGE}
                })} />
        </div>
        <div className="d-flex justify-content-start ">
            {errors.userName && (<p className='text-danger error-text-size mt-1 '>{`${errors.userName.message}`}</p>)}
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div className='error-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            {errors.repoId && (<p className='text-danger error-text-size mt-1 '>{`${errors.repoId.message}`}</p>)}
        </div>
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Description</span>
            <textarea className="form-control"   id="description" {...register("description",{
                required: CONST.DESCRIPTION_REQUIRED_MESSAGE, 
                minLength: { value: CONST.DESCRIPTION_MIN_LENGTH, message: CONST.DESCRIPTION_MIN_LENGTH_MESSAGE },
                maxLength: { value: CONST.DESCRIPTION_MAX_LENGTH, message: CONST.DESCRIPTION_MAX_LENGTH_MESSAGE },
                pattern:   { value: CONST.DESCRIPTION_PATTERN,  message: CONST.DESCRIPTION_PATTERN_MESSAGE}
                })}></textarea>
        </div>
        <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control" id="tags" {...register("tags",
                    {
                        pattern: {value: CONST.TAGS_PATTERN, message: CONST.TAGS_PATTERN_MESSAGE},
                        validate: (match) => { return Number(getValues("tags").trim().split(/ +/).filter(e=> e.length > 9)) === 0 || CONST.TAGS_MAX_LENGTH_MESSAGE }
                    }
                )} />
        </div>
        <div className="d-flex justify-content-start ">
            {errors.tags && (<p className='text-danger error-text-size '>{`${errors.tags.message}`}</p>)}
        </div>
        <div className='d-flex justify-content-center '>
            <button  className='btn btn-light btn-sm mb-3 border border-secondary'>Add</button>
            <span className="mx-1"></span>
            <button type='button' className='btn btn-light btn-sm mb-3 border border-secondary' onClick={handleCancel} >Cancel</button>
        </div>
      </form>
      {/* 
      Uncomment to see how values are populated in the form
      <DevTool control={control}/> 
      */}
      </React.Fragment>
      
   );
}

export default NewCommitSection;