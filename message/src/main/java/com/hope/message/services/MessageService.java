package com.hope.message.services;

import com.hope.message.dto.MessageDto;
import com.hope.message.entity.MessageEntity;
import com.hope.message.repository.MessageRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final JavaMailSender mailSender;

    @Value("${app.mail.recipient}")
    private String recipient;

    @Value("${spring.mail.username}")
    private String sender;

    public MessageService(MessageRepository messageRepository, JavaMailSender mailSender) {
        this.messageRepository = messageRepository;
        this.mailSender = mailSender;
    }

    /**
     * Save message to DB and return immediately.
     * Emails fire in a background thread — caller gets a fast response.
     */
    public MessageDto createMessage(MessageDto dto) {
        // 1. Persist to DB synchronously — this is instant
        MessageEntity entity = new MessageEntity();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setSubject(dto.getSubject());
        entity.setMessage(dto.getMessage());
        messageRepository.save(entity);

        // 2. Fire emails in background — doesn't block the response
        sendEmailsAsync(dto);

        return dto;
    }

    @Async
    public void sendEmailsAsync(MessageDto dto) {
        // Notification to Hope
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setFrom(sender);
            mail.setTo(recipient);
            mail.setReplyTo(dto.getEmail());
            mail.setSubject("Portfolio message: " + dto.getSubject());
            mail.setText(
                "New message from your portfolio contact form.\n\n" +
                "──────────────────────────\n" +
                "Name:    " + dto.getName()    + "\n" +
                "Email:   " + dto.getEmail()   + "\n" +
                "Subject: " + dto.getSubject() + "\n" +
                "──────────────────────────\n\n" +
                dto.getMessage() +
                "\n\n──────────────────────────\n" +
                "Reply directly to this email to respond."
            );
            mailSender.send(mail);
        } catch (Exception e) {
            if (e.getMessage() == null || !e.getMessage().contains("Failed to close server")) {
                System.err.println("[Mail] Failed to send notification: " + e.getMessage());
            }
        }

        // Confirmation to sender
        try {
            SimpleMailMessage confirmation = new SimpleMailMessage();
            confirmation.setFrom(sender);
            confirmation.setTo(dto.getEmail());
            confirmation.setSubject("Got your message — Hope Mutimutuje");
            confirmation.setText(
                "Hi " + dto.getName() + ",\n\n" +
                "Thanks for reaching out! I've received your message and will get back to you shortly.\n\n" +
                "────────────────────────────\n" +
                "Your message:\n" +
                dto.getMessage() + "\n" +
                "────────────────────────────\n\n" +
                "Best,\n" +
                "Hope Mutimutuje\n" +
                "Fullstack Developer — Kigali, Rwanda\n" +
                "mutimutujehope22@gmail.com"
            );
            mailSender.send(confirmation);
        } catch (Exception e) {
            if (e.getMessage() == null || !e.getMessage().contains("Failed to close server")) {
                System.err.println("[Mail] Failed to send confirmation: " + e.getMessage());
            }
        }
    }
}
