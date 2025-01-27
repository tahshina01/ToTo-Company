package com.example.travelApp.repositories;

import com.example.travelApp.models.ChatGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatGroupRepository extends JpaRepository<ChatGroup, Integer> {
    Optional<ChatGroup> findById(Integer id);
}
