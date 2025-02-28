package com.bytefest.bytefest.services;

import com.bytefest.bytefest.models.Talk;
import com.bytefest.bytefest.repositories.TalkRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TalkService {

    private final TalkRepo talkRepo;

    public List<Talk> getAllTalks(){
        return talkRepo.findAll();
    }

    public Talk getTalkById(Integer id){
        Optional<Talk> optionalTalk = talkRepo.findById(id);
        if(optionalTalk.isPresent()){
            return optionalTalk.get();
        }
        log.info("Talk with id: {} doesn't exist", id);
        return null;
    }

    public Talk saveTalk(Talk talk){
        talk.setCreatedAt(LocalDateTime.now());
        talk.setUpdatedAt(LocalDateTime.now());
        Talk savedTalk = talkRepo.save(talk);

        log.info("Talk with id: {} saved successfully", talk.getId());
        return savedTalk;
    }

    public Talk updateTalk (Talk talk) {
        Optional<Talk> existingTalk = talkRepo.findById(talk.getId());
        existingTalk.ifPresent(value -> talk.setCreatedAt(value.getCreatedAt()));
        talk.setUpdatedAt(LocalDateTime.now());

        Talk updatedUser = talkRepo.save(talk);

        log.info("User with id: {} updated successfully", talk.getId());
        return updatedUser;
    }

    public void deleteTalkById(Integer id) {
        talkRepo.deleteById(id);
    }

}