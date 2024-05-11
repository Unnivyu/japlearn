package japlearn.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.Classes;
import japlearn.demo.Entity.Student;
import japlearn.demo.Repository.ClassesRepository;
import japlearn.demo.Repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final ClassesRepository classesRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository, ClassesRepository classesRepository) {
        this.studentRepository = studentRepository;
        this.classesRepository = classesRepository;
    }



    public boolean joinClassCodeByFname(String fname, String classCode) {
        // Find the class entity by code
        Classes existingClass = classesRepository.findByClassCodes(classCode);

        // Find a student by their first name
        Student student = studentRepository.findByFname(fname);

        // If the class and student exist, update the student's class code
        if (existingClass != null && student != null) {
            student.setClassCode(classCode);
            studentRepository.save(student);
            return true;
        }

        // Return false if either the student or class wasn't found
        return false;
    }

    public Student authenticateStudent(String email, String password) {
        // Implement the logic to find a student by email and verify their password
        Optional<Student> optionalStudent = studentRepository.findByEmail(email);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            if (student.getPassword().equals(password)) {
                return student;
            }
        }
        return null;
    }
    
}
