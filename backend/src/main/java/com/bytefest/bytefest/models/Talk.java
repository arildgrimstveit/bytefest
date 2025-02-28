package com.bytefest.bytefest.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "talk")
public class Talk {

    @Id
    private Integer id;
    private String title;
    private String description;
    private LocalDate date;
    private Integer attendees;
    private ContentType contentType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum ContentType {
        Java, Dot_Net, React, Design, Frontend, Other
    }
}
