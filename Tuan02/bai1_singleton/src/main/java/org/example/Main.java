package org.example;

// Lớp Singleton: Quản lý cấu hình hệ thống
class AppConfig {
    // 1. Tạo một biến static duy nhất để chứa instance
    private static AppConfig instance;

    // Các thuộc tính ví dụ
    public String appName = "My Great App";
    public String version = "1.0.0";

    // 2. Private Constructor: Ngăn không cho bên ngoài dùng lệnh 'new'
    private AppConfig() {
        System.out.println("--- Khởi tạo AppConfig (Chỉ chạy 1 lần duy nhất) ---");
    }

    // 3. Static method: Cổng duy nhất để lấy đối tượng này
    public static AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }
}

public class Main {
    public static void main(String[] args) {
        // Lần gọi đầu tiên: Hệ thống sẽ khởi tạo đối tượng
        AppConfig config1 = AppConfig.getInstance();
        System.out.println("App Name: " + config1.appName);

        // Lần gọi thứ hai: Hệ thống trả về đối tượng đã có sẵn, không tạo mới
        AppConfig config2 = AppConfig.getInstance();

        // Thay đổi dữ liệu ở một nơi
        config2.appName = "Update New Name";

        // Kiểm tra xem config1 có bị đổi theo không
        System.out.println("App Name (từ config1): " + config1.appName);

        // Chứng minh 2 biến cùng trỏ vào 1 địa chỉ bộ nhớ
        if (config1 == config2) {
            System.out.println("=> config1 và config2 là CÙNG MỘT đối tượng (Singleton thành công!)");
        }
    }
}