package com.gud.comjou.controller;


import com.gud.comjou.config.EndpointURLs;
import com.gud.comjou.controller.dto.CommitDto;
import com.gud.comjou.service.CommitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
public class CommitsController {

    @Autowired
    CommitService service;

    @RequestMapping(
            value = EndpointURLs.GET_ALL_COMMITS,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CommitDto> getAllCommits() {
        return service.getAll();
    }

    @RequestMapping(
            value = EndpointURLs.GET_ALL_COMMITS_BY_SEARCH_STRING,
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CommitDto> getCommitByDescription(@RequestParam(value="q") String searchString) {
        return service.searchByTextString(searchString);
    }

    @RequestMapping(
            value = EndpointURLs.GET_COMMIT_BY_ID + "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public CommitDto getCommitByID(@PathVariable(value="id") String id)  {
        return service.getById(id);
    }

    @RequestMapping(
            value = EndpointURLs.CREATE_OR_REPLACE_COMMITS,
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<CommitDto> createOrReplaceCommit(@RequestBody List<CommitDto> body){
        return  service.addAll(body);
    }

    @RequestMapping(
            value = EndpointURLs.DELETE_COMMIT_BY_ID + "/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public String deleteByCommitID(@PathVariable(value="id") String id) {
        return service.delete(id);
    }

}


