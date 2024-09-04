package com.gud.comjou.service;

import com.gud.comjou.persistance.entity.Commit;

import java.util.List;

public interface ComJouService<T> {

    public T add(T entityDto);

    public List<T> addAll(List<T> entityDto );

    public String delete(String id);

    public T update(T entityDto);

    public List<T> getAll();

    public T getById(String id);

    public List<T> searchByTextString(String searchText);

}
