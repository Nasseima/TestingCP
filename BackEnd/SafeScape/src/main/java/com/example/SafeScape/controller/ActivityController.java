package com.example.SafeScape.controller;

import com.example.SafeScape.model.Activity;
import com.example.SafeScape.model.ActivityType;
import com.example.SafeScape.services.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping("/submitActivity")
    public void submitActivity(@RequestParam("type") ActivityType type) {
        Activity activity = new Activity();
        activity.setType(type);
        activityService.saveActivity(activity);
    }
}

