import AxiosClient from '../backend-client/AxiosClient';
import Tag from '../list-tags/Tag';
import './Commit.css';
import { useRecoilState } from 'recoil';
import { commitStateBucket } from '../../state/cjournalState';


const  Commit = ({element,setShowEdit}) => {
    const [commits, setCommitsBucket] = useRecoilState(commitStateBucket);

    const handleDeleteClick= (event) =>{

        const deleteCommitToBackend = async () => {
            try{
                const {data} = await AxiosClient.delete(`/api/v1/commit/${event.target.value}`);
                console.log(data);
            }catch (error){
                console.log(error);
            }
        }
        deleteCommitToBackend();
        setCommitsBucket(commits.filter((commit)=> commit.commitId !== event.target.value));
    }

    const handleEdit =  (event) => {
        console.log("Button triggrered next event:"+event.target);
            setShowEdit(event.target.value);
    }


    return (<div className='card mb-3 pe-3' >
        <div className="container m-2" key={element.id}>
            <div className="row">
                <div className='col-2'>
                    <div className="container">
                        <div className='row'>
                            <label className="badge my-custom-color ">id: {element.commitId}</label>
                        </div>
                       

                        <div className='row '>
                                <div className='col '>
                            
                          
                                    {element.tags.map((el)=>{return <Tag key={el.id} tagname={el.id}/>})}
                                    </div>
                           
                        </div>
                    </div>    
                </div>
                <div className='col'>
                    <div className='row mb-1'>
                            <label className="badge bg-secondary">repo: {element.repoId}</label>
                    </div>
                    <div className='card'>
                        <div className="card-header card-header-sm">Description</div>
                        <div className="card-body">
                            <p className="card-text">{element.description}</p>
                        </div>
                    </div>
                </div>
                <div className='col-2 '>
                    <div className="container">
                        <div className='row '>
                            <button type='submit' className='btn btn-light btn-sm m-1 border border-secondary'>Follow URL</button>
                        </div>
                        <div className='row'>
                            <button type='submit' className='btn btn-light btn-sm m-1 border border-secondary' value={element.commitId} onClick={handleEdit}>Edit</button>
                        </div>
                        <div className='row'>
                            <button onClick={handleDeleteClick} className='btn btn-light btn-sm m-1 border border-secondary' type='submit' value={element.commitId}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

            
           

    );
}

export default Commit;

