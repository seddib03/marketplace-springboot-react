package com.example.marketplace.payload;



public class ProductStatisticsDto {
    private long totalProducts;
    private long lowStock;
    private double averagePrice;

    public ProductStatisticsDto(long totalProducts, long lowStock, double averagePrice) {
        this.totalProducts = totalProducts;
        this.lowStock = lowStock;
        this.averagePrice = averagePrice;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public long getLowStock() {
        return lowStock;
    }

    public double getAveragePrice() {
        return averagePrice;
    }
}
