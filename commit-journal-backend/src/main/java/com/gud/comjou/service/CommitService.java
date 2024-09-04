package com.gud.comjou.service;

import com.gud.comjou.controller.dto.CommitDto;
import com.gud.comjou.controller.dto.TagDto;
import com.gud.comjou.persistance.entity.Commit;
import com.gud.comjou.persistance.entity.Tag;
import com.gud.comjou.persistance.repository.CommitRepository;
import com.gud.comjou.persistance.repository.TagRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CommitService implements ComJouService<CommitDto> {

    Logger logger = LoggerFactory.getLogger( CommitService.class);

    @Autowired
    CommitRepository commitRepository;

    @Autowired
    TagRepository tagRepository;

    @Override
    public CommitDto add(CommitDto entityDto) {

        Commit newEntity = commitRepository.save(toEntity(entityDto));

        return toDto(newEntity);
    }

    @Override
    public List<CommitDto> addAll(List<CommitDto> body) {
        return body.stream().map(commitDto -> add(commitDto)).toList();
    }

    @Override
    public String delete(String id) {
        return commitRepository.deleteByCommitId(id);
    }


    @Override
    public CommitDto update(CommitDto entityDto) {
//
//       Commit oldCommit = commitRepository.findByCommitId(entity.getCommitId());
//
//            //Filter out all tags that are not present in old tags
//            oldCommit.getTags().retainAll(entity.getTags());
//            //Remove from new tags all tags from old tags
//            entity.getTags().removeAll(oldCommit.getTags());
//            //Add tags that left  from new Tags to the old tags
//            oldCommit.getTags().addAll(entity.getTags());
//
//            oldCommit.setDescription(entity.getDescription());
//            oldCommit.setRepoId(entity.getRepoId());
//            oldCommit.setUserName(entity.getUserName());
//       return commitRepository.save(oldCommit);
        return null;
    }

    private Commit toEntity(CommitDto commitDto){

        Commit  commit = commitRepository.findByCommitId(commitDto.getCommitId());
        if(commit == null ){
            commit = new Commit();
            commit.setId(UUID.randomUUID().toString());
            commit.setCommitId(commitDto.getCommitId());
        }else{
            commit.getTags().clear();

        }


        //Populate tags
        for(TagDto dto : commitDto.getTags()){
            commit.getTags().add(manageTag(dto,commit));
        }


        commit.setDescription(commitDto.getDescription());
        commit.setUserName(commitDto.getUserName());
        commit.setRepoId(commitDto.getRepoId());

        return commit;

    }


    private Tag manageTag(TagDto dto, Commit commit){
        Optional<Tag> oldTagOPtional = tagRepository.findById(dto.getId());
        if(oldTagOPtional.isPresent()){
            return oldTagOPtional.get();
        }else{
            return  new Tag(dto.getId(),Set.of(commit));
        }
    }

    private CommitDto toDto(Commit commit){
        CommitDto dto = new CommitDto();
        dto.setCommitId(commit.getCommitId());
        dto.setDescription(commit.getDescription());
        dto.setUserName(commit.getUserName());
        dto.setId(commit.getId());
        dto.setRepoId(commit.getRepoId());
        dto.setTags(
                commit.getTags().stream().map(tag->new TagDto(tag.getTag())).collect(Collectors.toList())
        );
        return dto;
    }



    @Override
    public List<CommitDto> getAll() {
        return commitRepository.findAll().stream().map(commit-> toDto(commit)).toList();
    }

    @Override
    public CommitDto getById(String id) {
        return toDto(commitRepository.findByCommitId(id));
    }

    @Override
    public List<CommitDto> searchByTextString(String searchText) {
        return commitRepository.findByDescription(searchText).stream().map(commit-> toDto(commit)).toList();
    }


//    private Commit saveCommitWithExistingTags(Commit commit){
//        Set<Tag> existingTags = commit.getTags().stream().filter(tag -> tag.getId() != null).collect(Collectors.toSet());
//        commit.getTags().removeAll(existingTags);
//        //Save all new elements
//        commitRepository.saveAndFlush(commit);
//        //Put back existing elements
//        commit.getTags().addAll(existingTags);
//        //Save commit triggering update on existing elements
//        return commit;
//    }


    private List<Tag>  manageTags(Commit newCommit, Commit oldCommit) {

        //Keep only those tags  that came in newCommit
      //  oldtags = oldtags.stream().filter((oldTag)-> {return newtags.stream().filter((newTag)->newTag.getTagName().equalsIgnoreCase(oldTag.getTagName())).toList().size() > 0;}).collect(Collectors.toSet());
        //newtags.stream().filter((newTag)->{oldtags.stream().filter((newTag))

        /* Old way to manage tags below.  Now, during deserialization , if tag exists in DB, it wll be added to commit by Jackson
        See : TagFromJsonDeserializer

       return  newCommit.getTags().stream().map((newTag)-> {
            if (newTag.getId() != null) {
                Optional<Tag> tagAlreadyExist = tagRepository.findById(newTag.getId());
                if(tagAlreadyExist.isPresent()){
                    //Tag is present in DB , lets add new commit ID to it
                    Tag oldTag = tagAlreadyExist.get();
                    oldTag.getCommitRefs().add(newCommit.getId());
                    return tagRepository.save(oldTag);
                }else {
                    logger.warn("Wrong tag ID provided {} for the tag {}! Creating new tag.", newTag.getId(), newTag.getTagName());
                }
            }
            //No tag present in DB or  newTag.getId() is null
            newTag.setCommitRefs(Set.of(newCommit.getId()));
            newTag.setId(UUID.randomUUID().toString());
            return tagRepository.save(newTag);

        }).collect(Collectors.toList());
    }*/
       /* return newCommit.getTags().stream().map((tag) -> {
            tag.getCommitRefs().add(newCommit.getId());
            return tag;
        }).toList();*/
        return null;
    }
}

