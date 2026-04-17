package com.example.userservice.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity // THÊM DÒNG NÀY: Để bật @PreAuthorize trong Controller
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter; // Nhúng Filter vừa tạo

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        // Mở cửa tự do cho 2 API đăng ký, đăng nhập và các endpoint healthcheck báo cáo cho Spring Boot Admin
                        .requestMatchers("/api/users/register", "/api/users/login", "/api/users/logout", "/actuator/**").permitAll()
                        // Tất cả các API còn lại BẮT BUỘC phải có token mới được vào
                        .anyRequest().authenticated()
                )
                // Cấu hình trả về JSON khi dính lỗi phân quyền
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            // Lỗi 401: Chưa đăng nhập hoặc sai token
                            response.setContentType("application/json; charset=UTF-8");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("{\"error\": \"Bạn cần phải đăng nhập (Cung cấp Token hợp lệ) để thực hiện hành động này!\"}");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            // Lỗi 403: Đã đăng nhập nhưng không đủ quyền (VD: User gọi API của Admin)
                            response.setContentType("application/json; charset=UTF-8");
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().write("{\"error\": \"Truy cập bị từ chối! Bạn không có quyền (ROLE_ADMIN) để gọi API này!\"}");
                        })
                )
                // Chèn Filter của mình vào trước Filter mặc định của Spring
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}