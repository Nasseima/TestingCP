package com.example.SafeScape.services;

import com.example.SafeScape.common.PlaceRepository;
import com.example.SafeScape.model.Place;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    public Optional<Place> findPlaceById(Long id) {
        return placeRepository.findById(id);
    }

    public Place findPlaceByCity(String city) {
        List<Place> places = placeRepository.findByCity(city);
        return places.isEmpty() ? null : places.get(0); // Correctly handle List<Place>
    }

    public Place findPlaceByCountry(String country) {
        List<Place> places = placeRepository.findByCountry(country);
        return places.isEmpty() ? null : places.get(0); // Correctly handle List<Place>
    }

    public List<Place> findAllPlaces() {
        return placeRepository.findAll();
    }

    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }

    public void deletePlace(Long id) {
        placeRepository.deleteById(id);
    }

}
