package com.hope.message.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "messages")
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    public MessageEntity() {}

    public MessageEntity(String name, String email, String subject, String message) {
        this.name    = name;
        this.email   = email;
        this.subject = subject;
        this.message = message;
    }

    public Long getId()       { return id; }
    public String getName()   { return name; }
    public String getEmail()  { return email; }
    public String getSubject(){ return subject; }
    public String getMessage(){ return message; }

    public void setId(Long id)          { this.id = id; }
    public void setName(String name)    { this.name = name; }
    public void setEmail(String email)  { this.email = email; }
    public void setSubject(String s)    { this.subject = s; }
    public void setMessage(String m)    { this.message = m; }
}
