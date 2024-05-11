package japlearn.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.User;
import japlearn.demo.Service.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:8081")

public class UserController {   

    private final UserService japlearnService;


    @Autowired
    public UserController(UserService japlearnService) {
        this.japlearnService = japlearnService;
    }

    @PostMapping("/register")
    public Object registerUser(@RequestBody User user) {
        return japlearnService.registerUser(user);
    }
    

 
    
}
