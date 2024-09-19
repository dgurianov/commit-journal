package com.gud.comjou.persistance.repository;

import com.gud.comjou.persistance.entity.Commit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("${env}")
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:application-local.properties")
class CommitRepositoryTest {

    @Autowired
    private CommitRepository commitRepository;

    private Commit commit;

    @BeforeEach
    void setUp() {
        commit = new Commit();
        commit.setId(UUID.randomUUID().toString());
        commit.setCommitId("commitId");
        commit.setDescription("description");
        commit.setUserName("userName");
        commit.setRepoId("repoId");
    }

    @Test
    void testFindByCommitId() {
        commitRepository.save(commit);
        Commit foundCommit = commitRepository.findByCommitId("commitId");
        assertNotNull(foundCommit);
        assertEquals("commitId", foundCommit.getCommitId());
    }

    @Test
    void testDeleteByCommitId() {
        commitRepository.save(commit);
        String deletedCommitId = commitRepository.deleteByCommitId("commitId");
        assertEquals("1", deletedCommitId);
        assertNull(commitRepository.findByCommitId("commitId"));
    }

    @Test
    void testFindByDescription() {
        commitRepository.save(commit);
        List<Commit> foundCommits = commitRepository.findByDescription("description");
        assertNotNull(foundCommits);
        assertFalse(foundCommits.isEmpty());
        assertEquals("description", foundCommits.get(0).getDescription());
    }
}