package com.gud.comjou.controller;


import com.gud.comjou.config.EndpointURLs;
import com.gud.comjou.persistance.entity.Commit;
import com.gud.comjou.persistance.entity.Tag;
import com.gud.comjou.persistance.repository.CommitRepository;
import com.gud.comjou.persistance.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TagsController {

    @Autowired
    TagRepository repo;

    @RequestMapping(
            value = EndpointURLs.GET_ALL_TAGS,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Tag> getCommits() {
        return repo.findAll();
    }


}


