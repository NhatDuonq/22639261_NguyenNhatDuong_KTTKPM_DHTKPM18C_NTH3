package com.example.userservice.controller;

import com.example.userservice.dto.AuthRequest;
import com.example.userservice.entity.User;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.example.userservice.dto.UserEventDTO;

@RestController
@CrossOrigin(origins = "*") // Cho phép Frontend (ReactJS) ở máy khác gọi chéo qua LAN
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // THÊM MỚI: Inject Kafka Template
    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    // Định nghĩa tên Topic (Kênh phát sóng)
    private static final String TOPIC_USER_EVENTS = "user-events-topic";


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // 1. Validate dữ liệu
        if (userRepository.existsByUserName(user.getUserName())) {
            return ResponseEntity.badRequest().body("Username đã tồn tại!");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email đã được sử dụng!");
        }

        // 2. Lưu vào DB
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        User savedUser = userRepository.save(user);

        // 3. PUBLISH EVENT: Bắn tín hiệu sang Kafka
        UserEventDTO event = new UserEventDTO(
                savedUser.getId(),
                savedUser.getUserName(),
                savedUser.getEmail(),
                "USER_REGISTERED"
        );

        // Gửi message vào topic "user-events-topic"
        kafkaTemplate.send(TOPIC_USER_EVENTS, event);

        return ResponseEntity.ok("Đăng ký thành công và đã publish event!");
    }

    // 2. API Đăng nhập (Trả về Token)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Optional<User> userOptional = userRepository.findByUserName(authRequest.getUserName());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Kiểm tra mật khẩu mã hóa
            if (passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {

                // Tạo token chứa cả username và role
                String token = jwtUtil.generateToken(user.getUserName(), user.getRole());

                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("userName", user.getUserName());
                response.put("role", user.getRole());

                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tài khoản hoặc mật khẩu!");
    }

    // 3. API Lấy danh sách người dùng (Chỉ ADMIN mới được gọi)
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')") // Chặn quyền ngay tại cửa bằng Filter
    public ResponseEntity<?> getAllUsers() {
        // Nhờ có JwtAuthenticationFilter, nếu code chạy vào được đây
        // nghĩa là Token đã hợp lệ VÀ người dùng chắc chắn có role ADMIN.
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // 4. API Xóa tài khoản (Chỉ ADMIN mới được gọi)
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        // Kiểm tra xem user có tồn tại trong DB không
        if (!userRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng có ID: " + id);
        }

        // Thực hiện xóa
        userRepository.deleteById(id);
        return ResponseEntity.ok("Đã xóa tài khoản thành công!");
    }
    // 5. THÊM MỚI: API Lấy thông tin 1 người dùng theo ID
    @GetMapping("/users/{id}")
//    @PreAuthorize("hasRole('ADMIN')") // Chỉ Admin mới được xem, bạn có thể xóa dòng này nếu muốn ai cũng xem được
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            // Trả về dữ liệu user nếu tìm thấy (Status 200)
            return ResponseEntity.ok(userOptional.get());
        } else {
            // Báo lỗi nếu không tìm thấy (Status 404)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng có ID: " + id);
        }
    }
}