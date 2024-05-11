package japlearn.demo.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")


public class Student extends User {


    private String classCode;

    public Student() {
        super();
    }

    public Student(String id, String fname, String lname, String email, String password, String classCode) {
        super(id, fname, lname, email, password); 
        this.classCode = "";
    }

    public String getClassCode() {
        return classCode;
    }

    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }

    
    
}
