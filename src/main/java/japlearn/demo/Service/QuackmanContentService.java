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
	
	public QuackmanContent getContentByLevelId(String levelId) {
		return quackmanServiceRepository.findByLevelId(levelId).orElse(null);
	}
	
	public QuackmanContent addContentToLevel(String levelId, String newWord, String newHint) {
		Optional<QuackmanContent> quackmanContent = quackmanServiceRepository.findByLevelId(levelId);
	
		if(quackmanContent.isPresent()) {
			QuackmanContent quackman = quackmanContent.get();
			quackman.addWord(newWord);
			quackman.addHint(newHint);
			return quackmanServiceRepository.save(quackman);
		}
		
		return null;
	}
}
