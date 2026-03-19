package iuh.fit.decorator;
import iuh.fit.component.MilkTea;

public class CheeseDecorator extends MilkTeaDecorator {
    public CheeseDecorator(MilkTea milkTea) {
        super(milkTea);
    }

    @Override
    public double getCost() {
        return super.getCost() + 10000; // Thêm 10k kem cheese
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + Kem Cheese";
    }
}