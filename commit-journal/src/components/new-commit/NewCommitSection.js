import './NewCommitSection.css';
import AxiosClient from '../backend-client/AxiosClient';
import { useRecoilState } from 'recoil';
import { commitStateBucket, navBarState, tagsStateBucket } from '../../state/cjournalState';
import { useForm } from 'react-hook-form';
import React from 'react';

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
                const {data} = await AxiosClient.put('/api/v1/commit/',JSON.stringify([formData]),{headers: {"Content-Type": "application/json"}});
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


    return(<React.Fragment>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group input-group-sm  mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Commit id </span>
                <input type="text" id="commitId" className="form-control" {...register("commitId",{required: "Commit id is required", minLength: { value:1, message: "Commit id must be at least 1 digit."}})}/>
               
        </div>
        <div className="d-flex justify-content-start  mt-1">
            {errors.commitId && (<p className='text-danger small-text-size '>{`${errors.commitId.message}`}</p>)}  <div className='small-text-size ' >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
        <div className="input-group input-group-sm ">
            <input type="text" className="form-control" placeholder="Username"  id="userName" {...register("userName",{
                required: "Username is required", 
                minLength: { value: 3, message: "Username at least 3 letters." },
                maxLength: { value: 12, message: "Username no more than 12 letters." }
                }) }/>
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" placeholder="Repository"   id="repoId"  {...register("repoId",{
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
            <textarea className="form-control"   id="description" {...register("description")}></textarea>
        </div>
        <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control" id="tags" {...register("tags",
                    {validate: (match) => { return Number(getValues("tags").trim().split(/ +/).filter(e=> e.length > 9)) === 0 || "Tags can be not more then 8 symbols long!" }
                    }
                )} />
        </div>
        <div>
        {errors.tags && (<p className='text-danger small-text-size '>{`${errors.tags.message}`}</p>)}
        </div>
        <div className='d-flex justify-content-end '>
            <button  className='btn btn-light btn-sm mb-3 border border-secondary'>Add new</button>
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