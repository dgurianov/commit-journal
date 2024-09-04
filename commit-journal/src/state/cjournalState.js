import { atom, selector } from "recoil";

const commitStateBucket = atom({
    key:"commit-bucket",
    default:[]
});

const tagsStateBucket = atom(
    {
        key: "tags-bucket",
        default:[]
    }
);

const commitsFilterState = atom(
    {
        key: "commit-filter",
        default: new Set()
    }
);


const navBarState = atom(
    {
        key: "nav-bar-state",
        default: { "search":"active", "add":""}
    }
);

const filteredCommitsState = selector(
    {
        key: "commit-filtered-list",
        get: ({get}) => {
            const filter = get(commitsFilterState);
            const list = get(commitStateBucket);
            if(filter.size === 0  || filter.size === undefined) {return [...list]}
            const result = [...list.filter((commit)=> tagsExistInFilterArray(filter,commit))];
            return result;
        }
    }
);



function tagsExistInFilterArray(filterArray, commitArrayWithTags){
    return commitArrayWithTags.tags.filter((i)=>filterArray.has(i.id)).length > 0;
}



export {commitStateBucket, tagsStateBucket, commitsFilterState, filteredCommitsState, navBarState};