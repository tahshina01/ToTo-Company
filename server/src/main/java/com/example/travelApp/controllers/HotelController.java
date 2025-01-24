package com.example.travelApp.controllers;

import com.example.travelApp.dto.FileDto;
import com.example.travelApp.dto.HotelDto;
import com.example.travelApp.dto.Payment;
import com.example.travelApp.dto.RegHotelDto;
import com.example.travelApp.services.impl.HotelServiceImpl;
import com.example.travelApp.services.impl.PaymentServiceImpl;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/hotel")
@CrossOrigin
public class HotelController {
    @Autowired
    private HotelServiceImpl hotelService;

    @Autowired
    private PaymentServiceImpl paymentService;

    @PostMapping("/regHotel")
    public ResponseEntity<String> regHotel(@RequestParam(value = "documents", required = false) MultipartFile[] files,
                                                   @RequestParam (value = "file", required = false) MultipartFile file,
                                                   @ModelAttribute RegHotelDto regHotelDto) {
        try {
            System.out.println("Inside controller");
            List<MultipartFile> documents = new ArrayList<>();
            if (files != null) {
                for (MultipartFile f : files) {
                    if (!f.isEmpty()) {
                        System.out.println("Inside document");
                        documents.add(f);
                    }
                }
            }
            if (file != null && !file.isEmpty()) {
                regHotelDto.setImage(file.getBytes());
            }
            return hotelService.regHotel(documents, regHotelDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getHotels")
    public ResponseEntity<List<HotelDto>> getHotels() {
        return hotelService.getHotels();
    }

    @GetMapping("/getHotelsByUserId")
    public ResponseEntity<List<HotelDto>> getHotelsByUserId(@RequestParam String userId) {
        return hotelService.getHotelsByUserId(userId);
    }

    @PostMapping("/payment")
    ResponseEntity<String> payment(@RequestBody Payment payment) throws StripeException {
        return ResponseEntity.ok(paymentService.createPaymentLink(payment.getAmount()));
    }
}
