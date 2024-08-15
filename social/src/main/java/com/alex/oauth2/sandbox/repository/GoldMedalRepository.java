package com.alex.oauth2.sandbox.repository;

import com.alex.oauth2.sandbox.model.GoldMedal;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface GoldMedalRepository extends CrudRepository<GoldMedal, Long> {

  List<GoldMedal> getByCountryAndSeasonOrderByYearAsc(String country, String season);

  int countByCountry(String country);

  int countBySeason(String season);

  int countByCountryAndGender(String country, String gender);

  List<GoldMedal> getByCountryOrderByYearAsc(String country);

  List<GoldMedal> getByCountryOrderByYearDesc(String country);

  List<GoldMedal> getByCountryOrderBySeasonAsc(String country);

  List<GoldMedal> getByCountryOrderBySeasonDesc(String country);

  List<GoldMedal> getByCountryOrderByCityAsc(String country);

  List<GoldMedal> getByCountryOrderByCityDesc(String country);

  List<GoldMedal> getByCountryOrderByNameAsc(String country);

  List<GoldMedal> getByCountryOrderByNameDesc(String country);

  List<GoldMedal> getByCountryOrderByEventAsc(String country);

  List<GoldMedal> getByCountryOrderByEventDesc(String country);
}
