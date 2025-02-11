package  com.inf4067.driver_cart.repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.inf4067.driver_cart.model.*;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {
    List<Vehicule> findByType(VehicleType type);
    List<Vehicule> findByOptionsContaining(String option);

    @Query("SELECT v FROM Vehicule v WHERE"+
            "(:model IS NULL OR v.model LIKE %:model%) AND "+
            "(:marque IS NULL OR v.marque LIKE %:marque%) AND "+
            "(:type IS NULL OR v.type = :type) AND "+
            "(:minPrice IS NULL OR v.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR v.price <= :maxPrice) AND "+
            "(:price IS NULL OR v.price = :price)")
    List<Vehicule> searchVehicules(
        @Param("model") String model,
        @Param("marque") String marque,
        @Param("type") VehicleType type,
        @Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        @Param("price") Double price
    );

    
}