package japlearn.demo.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.User;

public interface UserRepository extends MongoRepository<User, String>{
    User findByEmail(String email);
    Optional<User> findByFname(String fname);
}
