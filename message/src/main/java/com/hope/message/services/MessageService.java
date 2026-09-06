package com.hope.message.services;

import com.hope.message.dto.MessageDto;
import com.hope.message.entity.MessageEntity;
import com.hope.message.repository.MessageRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
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

    public MessageDto createMessage(MessageDto dto) {
        // 1. Persist to DB
        MessageEntity entity = new MessageEntity();
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setSubject(dto.getSubject());
        entity.setMessage(dto.getMessage());
        messageRepository.save(entity);

        // 2. Send notification email to Hope
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

        // 3. Send confirmation to the sender
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
            "mutimutujehope90@gmail.com"
        );
        mailSender.send(confirmation);

        return dto;
    }
}
