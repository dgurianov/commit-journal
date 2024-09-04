package com.gud.comjou.util.reader;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gud.comjou.persistance.entity.Commit;
import com.gud.comjou.persistance.repository.CommitRepository;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
@Slf4j
public class FileSystemJsonReader implements DataReader<Commit> {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    CommitRepository repo;

    @Value("${fake.data.stub.file}")
    private String filePathString;

    @PostConstruct
    @Override
    public List<Commit> readAll() {
        try {
            //readToDatabase();
        } catch (Exception e) {
            log.error("There was a problem to read file {}", filePathString);
            return Collections.emptyList();
        }
        return repo.findAll();
    }

    public void readToDatabase() throws Exception {
        List<Commit> list = objectMapper.readValue(getClass().getResourceAsStream(filePathString), new TypeReference<List<Commit>>() {
        });
        repo.saveAll(list);

    }
}