package com.bytefest.bytefest.controllers;

import com.bytefest.bytefest.models.Event;
import com.bytefest.bytefest.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event/v1")
@RequiredArgsConstructor
@Validated
public class EventController {

    private final EventService EventService;

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/event/v1/
     * Purpose: Fetches all the Events in the Event table
     * @return List of Events
     */
    @GetMapping("/")
    public ResponseEntity<List<Event>> getAllEvents(){
        return ResponseEntity.ok().body(EventService.getAllEvents());
    }

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/event/v1/{id}
     * Purpose: Fetches Event with the given id
     * @param id - Event id
     * @return Event with the given id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer id)
    {
        return ResponseEntity.ok().body(EventService.getEventById(id));
    }

    /**
     * This method is called when a POST request is made
     * URL: localhost:8080/event/v1/
     * Purpose: Save an Event
     * @param Event - Request body is an Event
     * @return Saved Event
     */
    @PostMapping("/")
    public ResponseEntity<Event> saveEvent(@RequestBody Event Event)
    {
        return ResponseEntity.ok().body(EventService.saveEvent(Event));
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/event/v1/
     * Purpose: Update an Event
     * @param Event - Event to be updated
     * @return Updated Event
     */
    @PutMapping("/")
    public ResponseEntity<Event> updateEvent(@RequestBody Event Event)
    {
        return ResponseEntity.ok().body(EventService.updateEvent(Event));
    }

    /**
     * This method is called when a DELETE request is made
     * URL: localhost:8080/event/v1/{id}
     * Purpose: Delete an Event
     * @param id - Event's id to be deleted
     * @return a String message indicating Event record has been deleted successfully
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEventById(@PathVariable Integer id)
    {
        EventService.deleteEventById(id);
        return ResponseEntity.ok().body("Deleted Event successfully");
    }

}
