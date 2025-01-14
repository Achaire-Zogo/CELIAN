# Document Service

## Description
Service de génération et gestion des documents utilisant le pattern Builder.

## Fonctionnalités
- Génération de documents PDF
- Génération de documents HTML
- Gestion des templates
- Archivage des documents
- Signature électronique
- Validation des documents
- Export multi-format

## Design Patterns

### Builder Pattern
```java
public class DocumentBuilder {
    private Document document = new Document();
    
    public DocumentBuilder withType(DocumentType type) {
        document.setType(type);
        return this;
    }
    
    public DocumentBuilder withTemplate(String template) {
        document.setTemplate(template);
        return this;
    }
    
    public DocumentBuilder withData(Map<String, Object> data) {
        document.setData(data);
        return this;
    }
    
    public Document build() {
        validateDocument();
        processTemplate();
        return document;
    }
}
```

## Structure du Code
```
src/
├── main/
│   ├── java/
│   │   └── com/celian/document/
│   │       ├── builder/
│   │       │   └── DocumentBuilder.java
│   │       ├── controller/
│   │       │   └── DocumentController.java
│   │       ├── service/
│   │       │   ├── DocumentService.java
│   │       │   └── TemplateService.java
│   │       ├── generator/
│   │       │   ├── PDFGenerator.java
│   │       │   └── HTMLGenerator.java
│   │       ├── repository/
│   │       │   └── DocumentRepository.java
│   │       └── model/
│   │           ├── Document.java
│   │           └── Template.java
│   └── resources/
│       └── application.yml
```

## API Endpoints

### Documents
```http
POST /api/documents/generate
GET /api/documents/{id}
GET /api/documents/{id}/download
DELETE /api/documents/{id}
GET /api/documents/order/{orderId}
```

### Templates
```http
GET /api/documents/templates
POST /api/documents/templates
PUT /api/documents/templates/{id}
DELETE /api/documents/templates/{id}
```

## Modèles de Données

### Document
```java
@Entity
public class Document {
    @Id
    @GeneratedValue
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private DocumentType type;
    
    @ManyToOne
    private Template template;
    
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> data;
    
    private String filePath;
    private String fileUrl;
    private String mimeType;
    
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
}
```

## Génération PDF
```java
@Service
public class PDFGenerator {
    public byte[] generatePDF(Document document) {
        PdfDocument pdf = new PdfDocument();
        // Configuration et génération du PDF
        return pdf.generate();
    }
}
```

## Stockage S3
```java
@Service
public class S3StorageService {
    private final AmazonS3 s3Client;
    
    public String uploadDocument(String key, byte[] content) {
        PutObjectRequest request = new PutObjectRequest(bucketName, key, content);
        s3Client.putObject(request);
        return s3Client.getUrl(bucketName, key).toString();
    }
}
```

## Cache Redis
```java
@Cacheable(value = "templates", key = "#templateId")
public Template getTemplate(Long templateId) {
    return templateRepository.findById(templateId)
        .orElseThrow(() -> new TemplateNotFoundException(templateId));
}
```

## Tests
```bash
./mvnw test
```

## Docker
```bash
docker build -t celian/document-service .
docker run -p 8084:8084 celian/document-service
```

## Intégration
- Service Discovery (Eureka)
- Configuration centralisée
- Amazon S3 pour le stockage
- Cache Redis
- RabbitMQ pour les événements
- Circuit Breaker
