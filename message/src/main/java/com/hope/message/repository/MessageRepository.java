package com.hope.message.repository;

import com.hope.message.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    List<MessageEntity> findByEmail(String email);
}
