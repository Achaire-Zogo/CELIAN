package com.inf4067.driver_cart.document.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.document.model.Document;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByType(DocumentType type);
}
