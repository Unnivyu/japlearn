package japlearn.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.Classes;
import japlearn.demo.Repository.ClassesRepository;

@Service
public class ClassesService {
    @Autowired
    private ClassesRepository classRepository;

    // Method to create a new ClassEntity with a single class code
    public Classes addClass(String classCode) {
        // Create a new ClassEntity object and set the class code
        Classes newClassEntity = new Classes();
        newClassEntity.setClassCodes(classCode);

        // Save the new entity to the repository and return it
        return classRepository.save(newClassEntity);
    }

    public void removeClass(String classCode) {
        Classes classToRemove = classRepository.findByClassCodes(classCode);
        if (classToRemove != null) {
            classRepository.delete(classToRemove);
        }
    }

    


}
