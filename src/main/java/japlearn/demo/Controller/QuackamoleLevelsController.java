package japlearn.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import japlearn.demo.Entity.QuackamoleLevels;
import japlearn.demo.Service.QuackamoleLevelsService;

@RestController
@RequestMapping("/api/quackamolelevels")
@CrossOrigin(origins = "http://localhost:8081")
public class QuackamoleLevelsController {

    @Autowired
    QuackamoleLevelsService quackamoleLevelsService;

    @PostMapping("/addLevel")
    public QuackamoleLevels createQuackamoleLevel(@RequestBody QuackamoleLevels quackamoleLevels) {
        return quackamoleLevelsService.createQuackamoleLevel(quackamoleLevels);
    }

    @GetMapping("/getLevel/{id}")
    public QuackamoleLevels getQuackamoleLevel(@PathVariable("id") String id) throws Exception {
        return quackamoleLevelsService.findQuackamoleLevelById(id);
    }

    @DeleteMapping("/deleteLevel/{id}")
    public String removeQuackamoleLevel(@PathVariable("id") String id) {
        return quackamoleLevelsService.removeQuackamoleLevelById(id);
    }
}

