package iuh.fit;

import iuh.fit.factory.*;

public class Main {
    public static void main(String[] args) {
        Logistics road = new RoadLogistics();
        road.planDelivery();
    }
}