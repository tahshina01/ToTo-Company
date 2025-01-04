package com.example.travelApp.controllers;

import com.example.travelApp.dto.HotelDto;
import com.example.travelApp.dto.Payment;
import com.example.travelApp.services.impl.HotelServiceImpl;
import com.example.travelApp.services.impl.PaymentServiceImpl;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotel")
@CrossOrigin
public class HotelController {
    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private PaymentServiceImpl paymentService;

    @GetMapping("/getHotels")
    public ResponseEntity<List<HotelDto>> getHotels() {
        return hotelService.getHotels();
    }

    @PostMapping("/payment")
    ResponseEntity<String> payment(@RequestBody Payment payment) throws StripeException {
        return ResponseEntity.ok(paymentService.createPaymentLink(payment.getAmount()));
    }
}
