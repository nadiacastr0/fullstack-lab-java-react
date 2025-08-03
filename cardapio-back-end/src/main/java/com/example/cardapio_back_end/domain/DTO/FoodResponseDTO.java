package com.example.cardapio_back_end.domain.DTO;

import java.util.UUID;

import com.example.cardapio_back_end.domain.entities.Food;

public record FoodResponseDTO(
        UUID id,
        String title,
        String image,
        Integer price) {
    public FoodResponseDTO(Food food) {
        this(food.getId(), food.getTitle(), food.getImage(), food.getPrice());
    }

}
