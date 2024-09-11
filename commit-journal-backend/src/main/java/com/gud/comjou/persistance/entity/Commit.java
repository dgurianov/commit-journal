package com.gud.comjou.persistance.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.gud.comjou.persistance.EntitySupport;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "COMMIT")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Commit{

    @Id
    private String id;

    @Size(min = 2, message = "Commit id  at least 2 chars")
    private String commitId;

    @Size(min = 4, message = "Second Name at least 4 chars")
    private String userName;

    @Size(min = 4, message = "Repo id at least 4 chars")
    private String repoId;

    @Column(length = 3000 )
    @Size(min = 4, message = "Description  at least x chars")
    private String description;


    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.EAGER,cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "commit_tag",
            joinColumns = @JoinColumn(name = "commit_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private Set<Tag> tags = new HashSet<>();



}