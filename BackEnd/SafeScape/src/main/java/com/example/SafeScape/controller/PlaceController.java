package com.example.SafeScape.controller;

import com.example.SafeScape.model.*;
import com.example.SafeScape.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/places")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private LawService lawService;

    @Autowired
    private ActivityService activityService;

    // To find destinations by cities and countries
    @GetMapping("/city/{city}")
    public Place getPlaceByCity(@PathVariable String city) {
        return placeService.findPlaceByCity(city);
    }

    @GetMapping("/country/{country}")
    public Place getPlaceByCountry(@PathVariable String country) {
        return placeService.findPlaceByCountry(country);
    }

    // To find hotels by cities and countries
    @GetMapping("/city/{city}/hotels")
    public List<Hotel> getHotelsByCity(@PathVariable String city) {
        Place place = placeService.findPlaceByCity(city);
        return hotelService.findHotelsByPlace(place.getId());
    }

    @GetMapping("/country/{country}/hotels")
    public List<Hotel> getHotelsByCountry(@PathVariable String country) {
        Place place = placeService.findPlaceByCountry(country);
        return hotelService.findHotelsByPlace(place.getId());
    }

    // To find Laws by cities and countries
    @GetMapping("/city/{city}/laws")
    public List<Law> getLawsByCity(@PathVariable String city) {
        Place place = placeService.findPlaceByCity(city);
        return lawService.findLawsByPlace(place.getId());
    }

    @GetMapping("/country/{country}/laws")
    public List<Law> getLawsByCountry(@PathVariable String country) {
        Place place = placeService.findPlaceByCountry(country);
        return lawService.findLawsByPlace(place.getId());
    }

    // To find Activities by cities and countries
    @GetMapping("/city/{city}/activities")
    public List<Activity> getActivitiesByCity(@PathVariable String city) {
        Place place = placeService.findPlaceByCity(city);
        return activityService.findActivitiesByPlace(place.getId());
    }

    @GetMapping("/country/{country}/activities")
    public List<Activity> getActivitiesByCountry(@PathVariable String country) {
        Place place = placeService.findPlaceByCountry(country);
        return activityService.findActivitiesByPlace(place.getId());
    }
}

