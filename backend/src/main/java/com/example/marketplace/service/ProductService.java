package com.example.marketplace.service;

import com.example.marketplace.model.Product;
import com.example.marketplace.payload.ProductStatisticsDto;
import com.example.marketplace.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProduct(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public ProductStatisticsDto getProductStatistics() {
        List<Product> products = productRepository.findAll();

        long total = products.size();
        long lowStock = products.stream().filter(p -> p.getStock() < 5).count(); // Ajuste le seuil si tu veux
        double averagePrice = products.stream()
                .mapToDouble(Product::getPrice)
                .average()
                .orElse(0.0);

        return new ProductStatisticsDto(total, lowStock, averagePrice);
    }
}
