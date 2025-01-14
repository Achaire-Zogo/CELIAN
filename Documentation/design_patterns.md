# Diagrammes des Design Patterns

## 1. Abstract Factory Pattern

![Abstract Factory Pattern](images/abstract_factory.png)

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

## 2. Builder Pattern (Documents)

![Builder Pattern](images/builder.png)

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

## 3. Factory Method Pattern (Commandes)

![Factory Method Pattern](images/factory_method.png)

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

## 4. Composite Pattern (Sociétés)

![Composite Pattern](images/composite.png)

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

## 5. Observer Pattern (Catalogue)

![Observer Pattern](images/observer.png)

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

## 6. Decorator Pattern (Options Véhicule)

![Decorator Pattern](images/decorator.png)

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

## 7. Iterator Pattern (Catalogue)

![Iterator Pattern](images/iterator.png)

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

## 8. Template Method Pattern (Calcul Commande)

![Template Method Pattern](images/template_method.png)

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
