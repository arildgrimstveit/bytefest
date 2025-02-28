package com.bytefest.bytefest.repositories;

import com.bytefest.bytefest.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepo extends JpaRepository<Event, Integer> {
}
