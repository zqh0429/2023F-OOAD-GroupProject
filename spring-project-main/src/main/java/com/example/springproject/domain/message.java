package com.example.springproject.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Builder
@Data
@AllArgsConstructor
public class message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @NotNull
    private String message_content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date message_timestamp;




    @NotNull
    @ManyToOne
    @JoinColumn(name = "sender",referencedColumnName = "studentId")
    private StudentInfo sender;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "recipient",referencedColumnName = "studentId")
    private StudentInfo recipient;


    public message(String message_content, StudentInfo sender, StudentInfo recipient) {
        this.message_content = message_content;
        this.sender = sender;
        this.recipient = recipient;
    }

    public message() {

    }

    @PrePersist
    protected void onCreate() {
        if (message_timestamp == null) {
            message_timestamp = new Date();
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage_content() {
        return message_content;
    }

    public void setMessage_content(String message_content) {
        this.message_content = message_content;
    }

    public Date getMessage_timestamp() {
        return message_timestamp;
    }

    public void setMessage_timestamp(Date message_timestamp) {
        this.message_timestamp = message_timestamp;
    }

    public StudentInfo getSender() {
        return sender;
    }

    public void setSender(StudentInfo sender) {
        this.sender = sender;
    }

    public StudentInfo getRecipient() {
        return recipient;
    }

    public void setRecipient(StudentInfo recipient) {
        this.recipient = recipient;
    }

// constructors, getters, setters...

}
