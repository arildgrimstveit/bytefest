package com.bytefest.bytefest.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "event")
public class Event {

    @Id
    private Integer id;
    private String title;
    private String description;
    private Visability visability;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public enum Visability {
    Public, Private, AttendeesOnly
    }
}