package japlearn.demo.Entity;

import org.springframework.data.mongodb.core.mapping.Document;




@Document(collection = "classcodes")

public class Classes {

    
    private String classCodes;
    

    public Classes() {
    }



    public String getClassCodes() {
        return classCodes;
    }


    public void setClassCodes(String classCodes) {
        this.classCodes = classCodes;
    }


    
}
