package com.bytefest.bytefest.services;

import com.bytefest.bytefest.models.ByteUser;
import com.bytefest.bytefest.repositories.ByteUserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ByteUserService {

    private final ByteUserRepo byteUserRepo;

    public List<ByteUser> getAllUsers(){
        return byteUserRepo.findAll();
    }

    public ByteUser getUserById(Integer id){
        Optional<ByteUser> optionalUser = byteUserRepo.findById(id);
        if(optionalUser.isPresent()){
            return optionalUser.get();
        }
        log.info("User with id: {} doesn't exist", id);
        return null;
    }

    public ByteUser saveUser (ByteUser user){
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        ByteUser savedUser = byteUserRepo.save(user);

        log.info("User with id: {} saved successfully", user.getId());
        return savedUser;
    }

    public ByteUser updateUser (ByteUser user) {
        Optional<ByteUser> existingUser = byteUserRepo.findById(user.getId());
        user.setCreatedAt(existingUser.get().getCreatedAt());
        user.setUpdatedAt(LocalDateTime.now());

        ByteUser updatedUser = byteUserRepo.save(user);

        log.info("User with id: {} updated successfully", user.getId());
        return updatedUser;
    }

    public void deleteUserById (Integer id) {
        byteUserRepo.deleteById(id);
    }

}