package japlearn.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.User;

public interface UserRepository extends MongoRepository<User, String>{
    User findByEmail(String email);
}
