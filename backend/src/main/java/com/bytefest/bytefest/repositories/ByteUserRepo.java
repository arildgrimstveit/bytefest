package com.bytefest.bytefest.repositories;

import com.bytefest.bytefest.models.ByteUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ByteUserRepo extends JpaRepository<ByteUser, Integer> {
}
