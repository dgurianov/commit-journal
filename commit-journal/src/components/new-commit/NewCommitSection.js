import './NewCommitSection.css';
import AxiosClient from '../backend-client/AxiosClient';
import { useRecoilState } from 'recoil';
import { commitStateBucket, navBarState, tagsStateBucket } from '../../state/cjournalState';
import { useForm } from 'react-hook-form';

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
         handleSubmit} = useForm();

    const onSubmit = (formData) => {
        formData.tags = [...formData.tags.split(" ").map((tagWord)=> {return {"id":tagWord}})];

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


    return(<div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group input-group-sm mb-3 mt-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Commit id </span>
                <input type="text" id="commitId" className="form-control" {...register("commitId")} />
        </div>
        <div className="input-group input-group-sm mb-3">
            <input type="text" className="form-control" placeholder="Username"  id="userName" {...register("userName")}/>
            <span className="input-group-text">@</span>
            <input type="text" className="form-control" placeholder="Repository"   id="repoId"  {...register("repoId")} />
        </div>
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Description</span>
            <textarea className="form-control"   id="description" {...register("description")}></textarea>
        </div>
        <div className="input-group input-group-sm mb-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">Tags</span>
                <input type="text"  className="form-control" id="tags" {...register("tags")} />
        </div>
        <div className='d-flex justify-content-end '>
            <button  className='btn btn-light btn-sm mb-3 border border-secondary'>Add new</button>
        </div>
      </form>
      {/* 
      Uncomment to see how values are populated in the form
      <DevTool control={control}/> 
      */}
      </div>
      
   );
}

export default NewCommitSection;