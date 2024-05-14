package japlearn.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import japlearn.demo.Entity.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
    Student findByFname(String fname);
    Optional<Student> findByEmail(String email);
    List<Student> findByClassCode(String classCode);
}
