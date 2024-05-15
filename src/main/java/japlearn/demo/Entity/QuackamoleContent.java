package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackamoleContent")
public class QuackamoleContent {

    @Id
    private String id;
    private String[][] kanaRomajiPairs; // Each sub-array contains [kana, romaji]

    public QuackamoleContent() {
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[][] getKanaRomajiPairs() {
        return kanaRomajiPairs;
    }

    public void setKanaRomajiPairs(String[][] kanaRomajiPairs) {
        this.kanaRomajiPairs = kanaRomajiPairs;
    }
}