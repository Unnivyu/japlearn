package japlearn.demo.Entity;

import java.util.List;

public class Teacher extends User {

    private List<String> manageClasses;

    public List<String> getManageClasses() {
        return manageClasses;
    }

    public void setManageClasses(List<String> manageClasses) {
        this.manageClasses = manageClasses;
    }
    
    
}
