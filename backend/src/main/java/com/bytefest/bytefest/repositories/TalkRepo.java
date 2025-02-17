package com.bytefest.bytefest.repositories;

import com.bytefest.bytefest.models.Talk;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TalkRepo extends JpaRepository<Talk, Integer> {
}
