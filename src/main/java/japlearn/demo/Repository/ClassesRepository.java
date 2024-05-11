package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.Classes;

public interface ClassesRepository extends MongoRepository<Classes, String> {
    
    Classes findByClassCodes(String classCodes);


}
