package com.gud.comjou.persistance.repository;

import com.gud.comjou.persistance.entity.Commit;
import com.gud.comjou.persistance.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TagRepository extends JpaRepository<Tag, String> {


//    @Modifying
//    @Query("update Tag t set t.tag = ?1 where t.tag = ?1")
//    int setTagNameFor(String tag);

//    Tag findByTagName(String tagName);

}
