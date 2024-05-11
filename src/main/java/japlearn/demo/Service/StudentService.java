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
        Classes existingClass = classesRepository.findByClassCodes(classCode);

        Student student = studentRepository.findByFname(fname);

        if (existingClass != null && student != null) {
            student.setClassCode(classCode);
            studentRepository.save(student);
            return true;
        }

        return false;
    }

    
}
