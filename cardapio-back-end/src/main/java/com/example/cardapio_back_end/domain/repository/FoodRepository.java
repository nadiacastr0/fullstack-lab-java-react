package com.example.cardapio_back_end.domain.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cardapio_back_end.domain.entities.Food;

public interface FoodRepository extends JpaRepository<Food, UUID> {

}
