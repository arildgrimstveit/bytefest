package com.bytefest.bytefest.controllers;

import com.bytefest.bytefest.models.Room;
import com.bytefest.bytefest.services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/room/v2")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/rooms/v2/
     * Purpose: Fetches all the rooms in the room table
     * @return List of Rooms
     */
    @GetMapping("/")
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.getAllRooms();
        return ResponseEntity.ok().body(rooms);
    }

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/rooms/v2/{id}
     * Purpose: Fetches a room with the given id
     * @param id - room id
     * @return Room with the given id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Integer id) {
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * This method is called when a POST request is made
     * URL: localhost:8080/rooms/v2/
     * Purpose: Save a new Room
     * @param room - Request body is a Room
     * @return Saved Room
     */
    @PostMapping("/")
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        Room createdRoom = roomService.createRoom(room);
        return ResponseEntity.ok().body(createdRoom);
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/room/v2/
     * Purpose: Update a Room
     * @param room - Room to be updated
     * @return Updated Room
     */
    @PutMapping("/")
    public ResponseEntity<Room> updateTalk(@RequestBody Room room)
    {
        return ResponseEntity.ok().body(roomService.updateRoom(room));
    }



    /**
     * This method is called when a DELETE request is made
     * URL: localhost:8080/rooms/v2/{id}
     * Purpose: Delete a room with the given id
     * @param id - room id to be deleted
     * @return a String message indicating room record has been deleted successfully
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
        return ResponseEntity.ok().body("Deleted room successfully");
    }
}
