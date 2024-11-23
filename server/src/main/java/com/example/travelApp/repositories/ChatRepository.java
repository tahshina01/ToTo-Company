package com.example.travelApp.repositories;

import com.example.travelApp.models.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    Page<Chat> findByRoomId(Integer roomId, Pageable pageable);

    void deleteByRoomId(Integer roomId);
}
