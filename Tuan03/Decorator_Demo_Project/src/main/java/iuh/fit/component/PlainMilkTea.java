package iuh.fit.component;

public class PlainMilkTea implements MilkTea {
    @Override
    public double getCost() {
        return 30000; // Giá gốc 30k
    }

    @Override
    public String getDescription() {
        return "Trà sữa truyền thống";
    }
}