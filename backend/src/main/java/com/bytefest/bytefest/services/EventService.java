package com.bytefest.bytefest.services;

import com.bytefest.bytefest.models.Event;
import com.bytefest.bytefest.repositories.EventRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventService {

    private final EventRepo eventRepo;

    public List<Event> getAllEvents(){
        return eventRepo.findAll();
    }

    public Event getEventById(Integer id){
        Optional<Event> optionalEvent = eventRepo.findById(id);
        if(optionalEvent.isPresent()){
            return optionalEvent.get();
        }
        log.info("Event with id: {} doesn't exist", id);
        return null;
    }

    public Event saveEvent(Event Event){
        Event savedEvent = eventRepo.save(Event);

        log.info("Event with id: {} saved successfully", Event.getId());
        return savedEvent;
    }

    public Event updateEvent (Event event) {
        Event updatedUser = eventRepo.save(event);

        log.info("User with id: {} updated successfully", event.getId());
        return updatedUser;
    }

    public void deleteEventById(Integer id) {
        eventRepo.deleteById(id);
    }

}