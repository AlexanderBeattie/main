package com.alex.oauth2.sandbox.model;

import java.util.List;

public class CountriesResponse {

  private final List<CountrySummary> countries;

  public CountriesResponse(List<CountrySummary> countries) {
    this.countries = countries;
  }

  public List<CountrySummary> getCountries() {
    return countries;
  }
}
