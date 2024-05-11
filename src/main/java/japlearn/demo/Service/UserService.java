package japlearn.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.User;
import japlearn.demo.Repository.UserRepository;

@Service

public class UserService {

    private UserRepository userRepository = null;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Registers a new user and saves them to the MongoDB database.
     *
     * @param user The user to be registered.
     * @return The saved user.
     */
    public User registerUser(User user) {
        // Perform any business logic or validations here, if needed.
        // For example, you can check if a user with the same email already exists.

        // Save the user to the MongoDB database using the repository.
        User savedUser = userRepository.save(user);

        // Return the saved user.
        return savedUser;
    }

    
    
}
