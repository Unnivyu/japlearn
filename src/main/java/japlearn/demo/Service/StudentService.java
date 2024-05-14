package japlearn.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.Classes;
import japlearn.demo.Entity.Student;
import japlearn.demo.Entity.User;
import japlearn.demo.Repository.ClassesRepository;
import japlearn.demo.Repository.StudentRepository;
import japlearn.demo.Repository.UserRepository;

@Service
public class StudentService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ClassesRepository classesRepository;

    public boolean joinClassCodeByFname(String fname, String classCode) {
        Classes existingClass = classesRepository.findByClassCodes(classCode);
        Optional<User> userOpt = userRepository.findByFname(fname);
    
        if (existingClass != null && userOpt.isPresent()) {
            User user = userOpt.get();
            Student student = new Student(user, classCode);  // Now using the new constructor
            studentRepository.save(student);
            return true;
        }
        return false;
    }
}