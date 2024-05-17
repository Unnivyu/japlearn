package japlearn.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import japlearn.demo.Entity.QuackmanContent;
import japlearn.demo.Repository.QuackmanContentRepository;

@Service
public class QuackmanContentService {

	@Autowired
	QuackmanContentRepository quackmanServiceRepository;
	
	public QuackmanContent createQuackmanContent(QuackmanContent quackmanContent) {				
		return quackmanServiceRepository.save(quackmanContent);		
	}
	
	public String removeQuackmanContent(String contentId) {
		
		Optional<QuackmanContent> quackmanContent = quackmanServiceRepository.findById(contentId);
		
		if(quackmanContent.isPresent()) {
			quackmanServiceRepository.deleteById(contentId);
			return "Successfully deleted";
		}
		
		return "failed to delete";
	}
	
	
}
