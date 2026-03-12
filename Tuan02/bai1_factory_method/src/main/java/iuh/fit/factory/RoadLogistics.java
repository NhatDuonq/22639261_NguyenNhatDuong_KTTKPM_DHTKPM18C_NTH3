package iuh.fit.factory;
import iuh.fit.model.*; // Import để dùng Transport và Truck

public class RoadLogistics extends Logistics {
    public Transport createTransport() { return new Truck(); }
}