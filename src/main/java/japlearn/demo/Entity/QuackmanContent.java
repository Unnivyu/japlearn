package japlearn.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "quackmanContent")

public class QuackmanContent {
	
	@Id
	String contentId;
	String levelId;
	String[] hint;
	String[] word;
	
	public QuackmanContent() {

	}

	public QuackmanContent(String contentId, String levelId, String[] hint, String[] word) {
		this.contentId = contentId;
		this.levelId = levelId;
		this.hint = hint;
		this.word = word;
	}

	public String getcontentId() {
		return contentId;
	}

	public void setcontentId(String contentId) {
		this.contentId = contentId;
	}

	public String getLevelId() {
		return levelId;
	}

	public void setLevelId(String levelId) {
		this.levelId = levelId;
	}

	public String[] getHint() {
		return hint;
	}

	public void setHint(String[] hint) {
		this.hint = hint;
	}

	public String[] getWord() {
		return word;
	}

	public void setWord(String[] word) {
		this.word = word;
	}
	
	
	
}
