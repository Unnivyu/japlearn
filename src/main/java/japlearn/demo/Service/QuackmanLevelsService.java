package japlearn.demo.Service;

import java.util.Optional;

import org.hibernate.annotations.processing.Suppress;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackmanLevels;
import japlearn.demo.Repository.QuackmanLevelsRepository;

@Service
public class QuackmanLevelsService {
	
	@Autowired
	QuackmanLevelsRepository quackmanLevelsRepository;
	
	public QuackmanLevels createQuackmanLevel(QuackmanLevels quackmanLevels) {				
		return quackmanLevelsRepository.save(quackmanLevels);		
	}
	
	public QuackmanLevels findQuackmanLevelbyId(String Id) throws Exception{
		Optional<QuackmanLevels> quackmanlevel = quackmanLevelsRepository.findById(Id);
		
		if (quackmanlevel.isPresent()) {
			return quackmanlevel.get();
		} else {
			throw new Exception("Level"+ Id +"not found");
		}
	}
	
	public String removeQuackmanLevelbyId(String Id) {
		
		Optional<QuackmanLevels> quackmanlevel = quackmanLevelsRepository.findById(Id);
		
        if (quackmanlevel.isPresent()) {
            quackmanLevelsRepository.deleteById(Id);
            return "Successfully deleted level";
        }
		
		return "Failed to delete";
	}
}