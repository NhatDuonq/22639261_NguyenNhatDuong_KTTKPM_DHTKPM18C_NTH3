package iuh.fit.factory;
import iuh.fit.model.Transport;

public abstract class Logistics {
    public abstract Transport createTransport();
    public void planDelivery() {
        Transport t = createTransport();
        t.deliver();
    }
}