# Diagrammes à exporter

## 1. Abstract Factory Pattern
```mermaid
classDiagram
    class VehicleFactory {
        <<interface>>
        +createVehicle()
        +createEngine()
    }
    class ElectricVehicleFactory {
        +createVehicle()
        +createEngine()
    }
    class PetrolVehicleFactory {
        +createVehicle()
        +createEngine()
    }
    class Vehicle {
        <<interface>>
    }
    class Engine {
        <<interface>>
    }
    class ElectricCar
    class PetrolCar
    class ElectricEngine
    class PetrolEngine

    VehicleFactory <|.. ElectricVehicleFactory
    VehicleFactory <|.. PetrolVehicleFactory
    Vehicle <|.. ElectricCar
    Vehicle <|.. PetrolCar
    Engine <|.. ElectricEngine
    Engine <|.. PetrolEngine
    ElectricVehicleFactory ..> ElectricCar
    ElectricVehicleFactory ..> ElectricEngine
    PetrolVehicleFactory ..> PetrolCar
    PetrolVehicleFactory ..> PetrolEngine
```

## 2. Builder Pattern
```mermaid
classDiagram
    class DocumentBuilder {
        -document: Document
        +addHeader(header: String)
        +addContent(content: String)
        +addFooter(footer: String)
        +build() Document
    }
    class Document {
        -header: String
        -content: String
        -footer: String
        +setHeader(header: String)
        +setContent(content: String)
        +setFooter(footer: String)
    }
    class DocumentDirector {
        -builder: DocumentBuilder
        +constructPDFDocument()
        +constructHTMLDocument()
    }

    DocumentBuilder --> Document
    DocumentDirector --> DocumentBuilder
```

## 3. Factory Method Pattern
```mermaid
classDiagram
    class OrderCreator {
        <<interface>>
        +createOrder() Order
    }
    class CashOrderCreator {
        +createOrder() Order
    }
    class CreditOrderCreator {
        +createOrder() Order
    }
    class Order {
        <<interface>>
        +process()
    }
    class CashOrder {
        +process()
    }
    class CreditOrder {
        +process()
    }

    OrderCreator <|.. CashOrderCreator
    OrderCreator <|.. CreditOrderCreator
    Order <|.. CashOrder
    Order <|.. CreditOrder
    CashOrderCreator ..> CashOrder
    CreditOrderCreator ..> CreditOrder
```

## 4. Composite Pattern
```mermaid
classDiagram
    class Company {
        <<interface>>
        +addSubsidiary(Company)
        +removeSubsidiary(Company)
        +getSubsidiaries() List
    }
    class ParentCompany {
        -subsidiaries: List
        +addSubsidiary(Company)
        +removeSubsidiary(Company)
        +getSubsidiaries() List
    }
    class Subsidiary {
        -name: String
        +addSubsidiary(Company)
        +removeSubsidiary(Company)
        +getSubsidiaries() List
    }

    Company <|.. ParentCompany
    Company <|.. Subsidiary
    ParentCompany o--> Company
```

## 5. Observer Pattern
```mermaid
classDiagram
    class CatalogueSubject {
        -observers: List
        +attach(Observer)
        +detach(Observer)
        +notify()
    }
    class Observer {
        <<interface>>
        +update()
    }
    class PriceObserver {
        +update()
    }
    class StockObserver {
        +update()
    }

    CatalogueSubject --> Observer
    Observer <|.. PriceObserver
    Observer <|.. StockObserver
```

## 6. Decorator Pattern
```mermaid
classDiagram
    class Vehicle {
        <<interface>>
        +getDescription() String
        +cost() Double
    }
    class BaseVehicle {
        +getDescription() String
        +cost() Double
    }
    class OptionDecorator {
        <<abstract>>
        -vehicle: Vehicle
        +getDescription() String
        +cost() Double
    }
    class LeatherSeatsOption {
        +getDescription() String
        +cost() Double
    }
    class GPSOption {
        +getDescription() String
        +cost() Double
    }

    Vehicle <|.. BaseVehicle
    Vehicle <|.. OptionDecorator
    OptionDecorator <|-- LeatherSeatsOption
    OptionDecorator <|-- GPSOption
    OptionDecorator o--> Vehicle
```

## 7. Iterator Pattern
```mermaid
classDiagram
    class Iterator {
        <<interface>>
        +hasNext() Boolean
        +next() Vehicle
    }
    class CatalogueIterator {
        -vehicles: List
        -position: int
        +hasNext() Boolean
        +next() Vehicle
    }
    class Catalogue {
        -vehicles: List
        +createIterator() Iterator
    }

    Iterator <|.. CatalogueIterator
    Catalogue --> CatalogueIterator
```

## 8. Template Method Pattern
```mermaid
classDiagram
    class OrderCalculator {
        <<abstract>>
        +calculateTotal() Double
        #calculateBasePrice() Double
        #calculateTaxes() Double
        #calculateDiscount() Double
    }
    class CashOrderCalculator {
        #calculateTaxes() Double
        #calculateDiscount() Double
    }
    class CreditOrderCalculator {
        #calculateTaxes() Double
        #calculateDiscount() Double
    }

    OrderCalculator <|-- CashOrderCalculator
    OrderCalculator <|-- CreditOrderCalculator
```

Instructions :
1. Ouvrez https://mermaid.live/
2. Copiez chaque diagramme un par un
3. Téléchargez l'image PNG
4. Sauvegardez dans le dossier Documentation/images/
