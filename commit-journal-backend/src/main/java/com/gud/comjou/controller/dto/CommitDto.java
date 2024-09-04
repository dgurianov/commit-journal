package com.gud.comjou.controller.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CommitDto {
    private String id ;
    private String commitId;
    private String repoId;
    private String userName;
    private String description ;
    private List<TagDto> tags;
}
