package com.bytefest.bytefest.services;

import com.bytefest.bytefest.models.Room;
import com.bytefest.bytefest.repositories.RoomRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {

    private final RoomRepo roomRepository;

    /**
     * Fetches all the rooms from the database.
     * @return List of all rooms.
     */
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    /**
     * Fetches a room by its id.
     * @param id - Room id
     * @return Room object if found, otherwise an empty Optional.
     */
    public Optional<Room> getRoomById(Integer id) {
        Optional<Room> room = roomRepository.findById(id);
        if (room.isPresent()) {
            log.info("Room with id: {} found", id);
        } else {
            log.info("Room with id: {} not found", id);
        }
        return room;
    }

    /**
     * Saves a new room to the database.
     * @param room - Room to be saved.
     * @return Saved room object.
     */
    public Room createRoom(Room room) {
        Room savedRoom = roomRepository.save(room);
        log.info("Room with id: {} created successfully", savedRoom.getId());
        return savedRoom;
    }

    /**
     * Updates an existing room.
     * @param room - Room object with updated data.
     * @return Updated room object.
     */
    public Room updateRoom(Room room) {
        Optional<Room> existingRoom = roomRepository.findById(room.getId());
        if (existingRoom.isPresent()) {
            Room updatedRoom = roomRepository.save(room);
            log.info("Room with id: {} updated successfully", updatedRoom.getId());
            return updatedRoom;
        } else {
            log.warn("Room with id: {} not found for update", room.getId());
            return null;
        }
    }

    /**
     * Deletes a room by its id.
     * @param id - Room id to be deleted.
     */
    public void deleteRoom(Integer id) {
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
            log.info("Room with id: {} deleted successfully", id);
        } else {
            log.warn("Room with id: {} not found for deletion", id);
        }
    }
}
