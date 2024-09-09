package com.example.SafeScape.common;

import com.example.SafeScape.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCity(String city);
    List<Place> findByCountry(String country);
}
