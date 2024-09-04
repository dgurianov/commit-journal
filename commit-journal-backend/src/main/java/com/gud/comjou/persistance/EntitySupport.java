package com.gud.comjou.persistance;

import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class EntitySupport {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2" , strategy = "uuid2")
//    @Type(type="uuid-char")  In case this field is UUID type and exception is thrown  Caused by: org.h2.jdbc.JdbcSQLDataException: Hexadecimal string contains non-hex character
    private String id;

    protected EntitySupport(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
