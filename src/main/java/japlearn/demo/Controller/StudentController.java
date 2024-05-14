package japlearn.demo.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.Student;
import japlearn.demo.Service.StudentService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/students")


public class StudentController {

    private final StudentService studentService;



    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/joinClass")
    public ResponseEntity<String> joinClass(@RequestParam String fname, @RequestParam String classCode) {
        boolean success = studentService.joinClassCodeByFname(fname, classCode);

        if (success) {
            return ResponseEntity.ok("Successfully joined the class.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class code or student with the given name not found.");
        }
    }

    @GetMapping("/getByClassCode")
    public ResponseEntity<List<Student>> getStudentsByClassCode(@RequestParam String classCode) {
        List<Student> students = studentService.getStudentsByClassCode(classCode);
        return ResponseEntity.ok(students);
    }

}
