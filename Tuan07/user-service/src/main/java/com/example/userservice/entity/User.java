package com.example.userservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String userName;

    @Column(nullable = false)
    private String password;

    // THÊM MỚI: Thuộc tính Email
    @Column(unique = true, nullable = false, length = 100)
    private String email;

    // SỬA ĐỔI: Chuyển role thành kiểu String để khớp với ENUM hoặc lưu text
    @Column(columnDefinition = "ENUM('USER', 'ADMIN') DEFAULT 'USER'")
    private String role;

    // THÊM MỚI: Tự động lấy thời gian tạo, không cho phép update sau khi tạo
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Timestamp createdAt;
}