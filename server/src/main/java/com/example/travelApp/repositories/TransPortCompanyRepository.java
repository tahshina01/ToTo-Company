package com.example.travelApp.repositories;

import com.example.travelApp.models.TransportCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransPortCompanyRepository extends JpaRepository<TransportCompany, Integer> {
}
