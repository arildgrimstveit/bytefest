package com.bytefest.bytefest.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "room")
public class Room {

    @Id
    private Integer id;
    private String name;
    private String description;
    private Integer maxAttendees;
}
