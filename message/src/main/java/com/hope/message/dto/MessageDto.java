package com.hope.message.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MessageDto {

    @NotBlank(message = "Name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Subject is required")
    @Size(max = 200)
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(max = 5000)
    private String message;

    public MessageDto() {}

    public MessageDto(String name, String email, String subject, String message) {
        this.name    = name;
        this.email   = email;
        this.subject = subject;
        this.message = message;
    }

    public String getName()    { return name; }
    public String getEmail()   { return email; }
    public String getSubject() { return subject; }
    public String getMessage() { return message; }

    public void setName(String name)     { this.name = name; }
    public void setEmail(String email)   { this.email = email; }
    public void setSubject(String s)     { this.subject = s; }
    public void setMessage(String m)     { this.message = m; }
}
