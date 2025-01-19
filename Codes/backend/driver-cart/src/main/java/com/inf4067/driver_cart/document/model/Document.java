package com.inf4067.driver_cart.document.model;

import com.inf4067.driver_cart.document.enumeration.DocumentType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String name;
    private String header;
    private String title;
    private String content;

    
    @Enumerated(EnumType.STRING)
    private DocumentType type;

    public abstract void generatedDocument();

    protected DocumentType getType() {
        return type;
    }

    protected void setType(DocumentType type) {
        this.type = type;
    }
}
