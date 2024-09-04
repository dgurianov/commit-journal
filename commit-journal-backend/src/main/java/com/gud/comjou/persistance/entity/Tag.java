package com.gud.comjou.persistance.entity;

import com.gud.comjou.persistance.EntitySupport;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "TAG")
@NoArgsConstructor
@AllArgsConstructor
@Data
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
//@JsonDeserialize(using = TagFromJsonDeserializer.class)
public class Tag {

    @Id
    private String tag;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @ManyToMany(mappedBy = "tags")
    private Set<Commit> commitRefs = new HashSet<>();



}
