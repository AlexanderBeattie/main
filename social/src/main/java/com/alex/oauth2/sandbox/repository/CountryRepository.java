package com.alex.oauth2.sandbox.repository;

import com.alex.oauth2.sandbox.model.Country;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface CountryRepository extends CrudRepository<Country, Long> {

  List<Country> getAllByOrderByNameAsc();

  List<Country> getAllByOrderByNameDesc();

  List<Country> getAllByOrderByGdpAsc();

  List<Country> getAllByOrderByGdpDesc();

  List<Country> getAllByOrderByPopulationAsc();

  List<Country> getAllByOrderByPopulationDesc();

  Optional<Country> getByName(String name);
}
