package com.inf4067.driver_cart.document.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.document.model.VehicleDocument;

public interface VehicleDocumentRepository extends JpaRepository<VehicleDocument, Long> {
    List<VehicleDocument> findByDocumentFormat(DocumentFormat format);
    List<VehicleDocument> findByDocumentType(DocumentType type);
}
