package japlearn.demo.Repository;

import japlearn.demo.Entity.QuackamoleLevels;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuackamoleLevelsRepository extends MongoRepository<QuackamoleLevels, String> {
}
