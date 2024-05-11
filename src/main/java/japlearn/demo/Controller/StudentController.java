package japlearn.demo.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.Student;
import japlearn.demo.Service.StudentService;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:8081")

public class StudentController {

    private final StudentService studentService;



    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Endpoint to register a new student
    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student) {
        return studentService.registerStudent(student);
    }

    @PostMapping("/joinClass")
    public ResponseEntity<String> joinClass(@RequestParam String fname, @RequestParam String classCodes) {
        boolean success = studentService.joinClassCodeByFname(fname, classCodes);

        if (success) {
            return ResponseEntity.ok("Successfully joined the class.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Class code or student with the given name not found.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestParam String email, @RequestParam String password) {
        // Check for missing email or password
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required");
        }
    
        // Log incoming data for debugging
        System.out.println("Attempting to log in with email: " + email);
    
        try {
            // Authenticate student
            Student student = studentService.authenticateStudent(email, password);
            if (student != null) {
                return ResponseEntity.ok(student);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }
    

}
