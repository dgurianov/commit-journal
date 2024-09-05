package com.gud.comjou.persistance.repository;

import com.gud.comjou.persistance.entity.Commit;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommitRepository extends JpaRepository<Commit, String> {

    public Commit findByCommitId(String commitId);

    @Transactional
    public String deleteByCommitId(String commitId);

    @Query(value="SELECT * FROM COMMIT C WHERE " +
            "LOWER(C.DESCRIPTION) LIKE LOWER(concat('% ', concat(?1, ' %'))) " +
            "OR LOWER(C.DESCRIPTION) LIKE LOWER(concat('% ', ?1)) " +
            "OR LOWER(C.DESCRIPTION) LIKE LOWER(concat(?1, ' %')) " +
            "OR LOWER(C.DESCRIPTION) LIKE LOWER(?1) ", nativeQuery=true)
    public List<Commit> findByDescription(String matchText);
}