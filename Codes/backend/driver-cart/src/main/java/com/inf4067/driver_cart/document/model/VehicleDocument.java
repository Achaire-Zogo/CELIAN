package com.inf4067.driver_cart.document.model;

import com.inf4067.driver_cart.document.builder.IDocumentBuilder;
import com.inf4067.driver_cart.document.enumeration.DocumentFormat;
import com.inf4067.driver_cart.document.enumeration.DocumentType;
import com.inf4067.driver_cart.order.model.Order;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@EqualsAndHashCode(callSuper = false)
public abstract class VehicleDocument {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /*@Column(unique = true)
    private String name;
    private String header;
    private String title;
    private String content;*/
    private String filepath;

    private long orderId;

    
    @Enumerated(EnumType.STRING)
    private DocumentFormat documentFormat;

    @Enumerated(EnumType.STRING)
    private DocumentType documentType;

    public abstract void generate(IDocumentBuilder documentBuilder);

    protected abstract String getFormattedContent();

    //DocumentType getOutputFormat();

    protected void setDocumentType(DocumentType documentType)
    {
        this.documentType = documentType;
    }

    protected DocumentType getDocumentType()
    {
        return this.documentType;
    }
}
