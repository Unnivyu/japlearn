package japlearn.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.Classes;
import japlearn.demo.Service.ClassesService;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api/classes")
public class ClassesController {
    private final ClassesService classService;

    @Autowired
    public ClassesController(ClassesService classService) {
        this.classService = classService;
    }

    // Update the method to receive a Classes object instead of a String
    @PostMapping("/addClass")
    public Classes addClassCode(@RequestBody Classes newClassEntity) {
        // Pass the entire entity to the service for adding
        return classService.addClass(newClassEntity.getClassCodes());
    }

    @DeleteMapping("/removeClass")
    public void removeClassCode(@RequestParam String classCode) {
        classService.removeClass(classCode);
    }

    
}
