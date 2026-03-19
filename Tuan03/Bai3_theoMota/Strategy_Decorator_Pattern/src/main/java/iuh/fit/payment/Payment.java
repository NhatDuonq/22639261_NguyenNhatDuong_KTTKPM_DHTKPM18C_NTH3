package iuh.fit.payment;

public interface Payment {
    double getAmount();      // Lấy số tiền cuối cùng
    String getDescription(); // Mô tả chi tiết thanh toán
}