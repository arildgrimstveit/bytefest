package com.bytefest.bytefest.controllers;

import com.bytefest.bytefest.models.Talk;
import com.bytefest.bytefest.services.TalkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/talk/v1")
@RequiredArgsConstructor
@Validated
public class TalkController {

    private final TalkService talkService;

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/talk/v1/
     * Purpose: Fetches all the talks in the talk table
     * @return List of Talks
     */
    @GetMapping("/")
    public ResponseEntity<List<Talk>> getAllTalks(){
        return ResponseEntity.ok().body(talkService.getAllTalks());
    }

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/talk/v1/{id}
     * Purpose: Fetches talk with the given id
     * @param id - talk id
     * @return Talk with the given id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Talk> getTalkById(@PathVariable Integer id)
    {
        return ResponseEntity.ok().body(talkService.getTalkById(id));
    }

    /**
     * This method is called when a POST request is made
     * URL: localhost:8080/talk/v1/
     * Purpose: Save a Talk
     * @param talk - Request body is a Talk
     * @return Saved Talk
     */
    @PostMapping("/")
    public ResponseEntity<Talk> saveTalk(@RequestBody Talk talk)
    {
        return ResponseEntity.ok().body(talkService.saveTalk(talk));
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/talk/v1/
     * Purpose: Update a Talk
     * @param talk - Talk to be updated
     * @return Updated Talk
     */
    @PutMapping("/")
    public ResponseEntity<Talk> updateTalk(@RequestBody Talk talk)
    {
        return ResponseEntity.ok().body(talkService.updateTalk(talk));
    }

    /**
     * This method is called when a DELETE request is made
     * URL: localhost:8080/talk/v1/{id}
     * Purpose: Delete a Talk
     * @param id - talk's id to be deleted
     * @return a String message indicating talk record has been deleted successfully
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTalkById(@PathVariable Integer id)
    {
        talkService.deleteTalkById(id);
        return ResponseEntity.ok().body("Deleted talk successfully");
    }

}
