package com.gud.comjou.service;

import com.gud.comjou.controller.dto.CommitDto;
import com.gud.comjou.controller.dto.TagDto;
import com.gud.comjou.persistance.entity.Commit;
import com.gud.comjou.persistance.entity.Tag;
import com.gud.comjou.persistance.repository.CommitRepository;
import com.gud.comjou.persistance.repository.TagRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CommitServiceTest {

    @Mock
    private CommitRepository commitRepository;

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private CommitService commitService;

    private CommitDto commitDto;
    private Commit commit;

    @BeforeEach
    void setUp() {
        commitDto = new CommitDto();
        commitDto.setCommitId("commitId");
        commitDto.setDescription("description");
        commitDto.setUserName("userName");
        commitDto.setRepoId("repoId");
        commitDto.setTags(List.of(new TagDto("tagId")));

        commit = new Commit();
        commit.setId(UUID.randomUUID().toString());
        commit.setCommitId("commitId");
        commit.setDescription("description");
        commit.setUserName("userName");
        commit.setRepoId("repoId");
        commit.setTags(Set.of(new Tag("tagId", Set.of(commit))));
    }

    @Test
    void testAdd() {
        when(commitRepository.save(any(Commit.class))).thenReturn(commit);

        CommitDto result = commitService.add(commitDto);

        assertNotNull(result);
        assertEquals(commitDto.getCommitId(), result.getCommitId());
        verify(commitRepository, times(1)).save(any(Commit.class));
    }

    @Test
    void testAddAll() {
        when(commitRepository.save(any(Commit.class))).thenReturn(commit);

        List<CommitDto> result = commitService.addAll(List.of(commitDto));

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(commitRepository, times(1)).save(any(Commit.class));
    }

    @Test
    void testDelete() {
        when(commitRepository.deleteByCommitId(anyString())).thenReturn("commitId");

        String result = commitService.delete("commitId");

        assertEquals("commitId", result);
        verify(commitRepository, times(1)).deleteByCommitId(anyString());
    }

    @Test
    void testUpdate() {
        // Implement the test for the update method when it is fully implemented
    }

    @Test
    void testGetAll() {
        when(commitRepository.findAll()).thenReturn(List.of(commit));

        List<CommitDto> result = commitService.getAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(commitRepository, times(1)).findAll();
    }

    @Test
    void testGetById() {
        when(commitRepository.findByCommitId(anyString())).thenReturn(commit);

        CommitDto result = commitService.getById("commitId");

        assertNotNull(result);
        assertEquals(commitDto.getCommitId(), result.getCommitId());
        verify(commitRepository, times(1)).findByCommitId(anyString());
    }

    @Test
    void testSearchByTextString() {
        when(commitRepository.findByDescription(anyString())).thenReturn(List.of(commit));

        List<CommitDto> result = commitService.searchByTextString("description");

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(commitRepository, times(1)).findByDescription(anyString());
    }
}