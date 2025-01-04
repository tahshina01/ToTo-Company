package com.example.travelApp.services;

import com.stripe.exception.StripeException;

public interface PaymentService {
    String createPaymentLink(double amount) throws StripeException;
}
