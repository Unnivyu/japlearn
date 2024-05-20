package japlearn.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import japlearn.demo.Entity.QuackamoleContent;
import japlearn.demo.Entity.QuackmanContent;
import japlearn.demo.Service.QuackmanContentService;

@RestController
@RequestMapping("/api/quackmancontent")
@CrossOrigin(origins = "http://localhost:8081") 
public class QuackmanContentController {

	@Autowired
	QuackmanContentService quackmanContentService;
	
	@PostMapping("/addContent")
	public QuackmanContent createQuackmanContent(@RequestBody QuackmanContent quackmanContent) {
		return quackmanContentService.createQuackmanContent(quackmanContent);
	}
	
	@DeleteMapping("/deleteContent/{contentId}")
	public String deleteQuackmanContent(@PathVariable ("contentId") String contentId) {
		return quackmanContentService.removeQuackmanContent(contentId);
	}
	
	@GetMapping("/getContentByLevelId/{levelId}")
	public QuackmanContent getContentByLevelId(@PathVariable ("levelId") String levelId) {
        return quackmanContentService.getContentByLevelId(levelId);
    }
}
