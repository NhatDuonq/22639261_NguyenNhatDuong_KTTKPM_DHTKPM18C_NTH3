package iuh.fit.context;

import iuh.fit.state.NewState;
import iuh.fit.state.OrderState;

public class Order {
    private OrderState state = new NewState(); // Mặc định ban đầu là New

    public void setState(OrderState state) {
        this.state = state;
    }

    public void nextStep() {
        state.next(this);
    }

    public void cancelOrder() {
        state.cancel(this);
    }

    public void showStatus() {
        state.printStatus();
    }
}