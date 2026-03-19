package iuh.fit;

import iuh.fit.component.MilkTea;
import iuh.fit.component.PlainMilkTea;
import iuh.fit.decorator.BubbleDecorator;
import iuh.fit.decorator.CheeseDecorator;

public class Main {
    public static void main(String[] args) {
        // 1. Ly trà sữa mộc
        MilkTea basicTea = new PlainMilkTea();
        System.out.println(basicTea.getDescription() + " | Giá: " + basicTea.getCost());

        // 2. Thêm trân châu vào ly mộc
        MilkTea bubbleTea = new BubbleDecorator(basicTea);
        System.out.println(bubbleTea.getDescription() + " | Giá: " + bubbleTea.getCost());

        // 3. Thêm kem cheese vào ly đã có trân châu (Bọc chồng lên nhau)
        MilkTea fullToppingTea = new CheeseDecorator(bubbleTea);
        System.out.println(fullToppingTea.getDescription() + " | Giá: " + fullToppingTea.getCost());
    }
}