package japlearn.demo.Service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackamoleLevels;
import japlearn.demo.Repository.QuackamoleLevelsRepository;

@Service
public class QuackamoleLevelsService {

    @Autowired
    QuackamoleLevelsRepository quackamoleLevelsRepository;

    public QuackamoleLevels createQuackamoleLevel(QuackamoleLevels quackamoleLevels) {
        return quackamoleLevelsRepository.save(quackamoleLevels);
    }

    public QuackamoleLevels findQuackamoleLevelById(String id) throws Exception {
        Optional<QuackamoleLevels> quackamoleLevel = quackamoleLevelsRepository.findById(id);
        return quackamoleLevel.orElseThrow(() -> new Exception("Level " + id + " not found"));
    }

    public String removeQuackamoleLevelById(String id) {
        Optional<QuackamoleLevels> quackamoleLevel = quackamoleLevelsRepository.findById(id);
        if (quackamoleLevel.isPresent()) {
            quackamoleLevelsRepository.deleteById(id);
            return "Successfully deleted level";
        }
        return "Failed to delete";
    }
}
