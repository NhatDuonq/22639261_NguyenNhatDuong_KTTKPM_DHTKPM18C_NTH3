package iuh.fit.state;
import iuh.fit.context.Order;

public class NewOrder implements OrderState {
    @Override
    public void handleRequest(Order order) {
        System.out.println("[Hành vi]: Đang kiểm tra thông tin đơn hàng...");
        // Sau khi kiểm tra xong, tự động chuyển sang Đang xử lý
        order.setState(new ProcessingOrder());
    }

    @Override
    public String getStatusName() { return "MỚI TẠO"; }
}