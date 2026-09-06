package com.hope.message.controller;

import com.hope.message.dto.MessageDto;
import com.hope.message.services.MessageService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<?> createMessage(@Valid @RequestBody MessageDto dto) {
        try {
            messageService.createMessage(dto);
            return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("success", true, "message", "Message sent successfully!"));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("success", false, "message", e.getMessage() != null ? e.getMessage() : e.getClass().getName()));
        }
    }
}
