package com.bytefest.bytefest.controllers;

import com.bytefest.bytefest.models.ByteUser;
import com.bytefest.bytefest.services.ByteUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/byteuser/v1")
@RequiredArgsConstructor
@Validated
public class ByteUserController {

    private final ByteUserService byteUserService;

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/byteuser/v1/
     * Purpose: Fetches all the users in the user table
     * @return List of Users
     */
    @GetMapping("/")
    public ResponseEntity<List<ByteUser>> getAllUsers(){
        return ResponseEntity.ok().body(byteUserService.getAllUsers());
    }

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/byteuser/v1/{id}
     * Purpose: Fetches employee with the given id
     * @param id - user id
     * @return User with the given id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ByteUser> getUserById(@PathVariable Integer id)
    {
        return ResponseEntity.ok().body(byteUserService.getUserById(id));
    }

    /**
     * This method is called when a POST request is made
     * URL: localhost:8080/byteuser/v1/
     * Purpose: Save a User
     * @param user - Request body is an User
     * @return Saved User
     */
    @PostMapping("/")
    public ResponseEntity<ByteUser> saveUser(@RequestBody ByteUser user)
    {
        return ResponseEntity.ok().body(byteUserService.saveUser(user));
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/byteuser/v1/
     * Purpose: Update a User
     * @param user - User to be updated
     * @return Updated User
     */
    @PutMapping("/")
    public ResponseEntity<ByteUser> updateUser(@RequestBody ByteUser user)
    {
        return ResponseEntity.ok().body(byteUserService.updateUser(user));
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/byteuser/v1/{id}
     * Purpose: Delete an Employee
     * @param id - user's id to be deleted
     * @return a String message indicating user record has been deleted successfully
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable Integer id)
    {
        byteUserService.deleteUserById(id);
        return ResponseEntity.ok().body("Deleted user successfully");
    }


}