package com.example.travelApp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class DestinationController {

    @GetMapping("/destinations/{id}")
    public Map<String, String> showDestinationById(@PathVariable Integer id) {
        String message = "Successfully Received the request with id " + id;
        Map<String, String> response = new HashMap<>();
        response.put("Message", message);

        return response;
    }

    @GetMapping("/destinations/search")
    public Map<String ,String> searchDestination(){
        String message = "Successfully Received the request";
        Map<String, String> response = new HashMap<>();
        response.put("Message", message);
        return response;
    }

    


}
