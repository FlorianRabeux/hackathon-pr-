package hello;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import javax.swing.text.Position;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import entities.*;

@RestController
@CrossOrigin
public class UserController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    
    private Zone zone = new Zone("51.508742","-0.120850");
    private Double position = Double.valueOf("0.0001");

    @CrossOrigin("login")
    @RequestMapping("/login")
    public Boolean login(@RequestParam(value="login", defaultValue="") String login, @RequestParam(value="password", defaultValue="") String password) {
        
    	HashMap<String,User> users = new HashMap<>();
    	
    	users.put("Florian",new User("Florian", "Flo"));
    	users.put("test",new User("test", "test"));
    	
    	if(users.containsKey(login) == true)
    	{
    		User user = users.get(login);
    		if(password.equals(user.getPassword()))
    		{
    			return true;
    		}
    		return false;
    	}
    	return false;
    }
    
    @RequestMapping("/getPosition")
    public Zone getPosition(@RequestParam(value="id", defaultValue="") String id) {
        
    	Double lat = Double.valueOf(zone.getLat());
    	Double lng = Double.valueOf(zone.getLng());
    	
    	lat = lat - position;
    	lng = lng - position;
    	
    	zone.setLat(lat.toString());
    	zone.setLng(lng.toString());
    	
    	return zone;
    }

    @RequestMapping("/things")
    public List<Thing> things() {
        
    	List<Thing> things = new ArrayList<>();
    
    	
    	
    	things.add(new Thing("1", "Murielle", "En sécurité", "Ecole", "08h00", "16h00", "Profile permettant de surveiller les déplacements de mon enfant"));
    	things.add(new Thing("2", "Jean-Luc", "En sécurité", "Travail", "06h00", "14h00", "Profile permettant de surveiller les déplacements de mon enfant"));
    	things.add(new Thing("3", "Zipo", "En sécurité", "Ecole", "06h00", "22h00", "Profile permettant de surveiller les déplacements de mon enfant"));
    	System.out.println("things request");
    	return things;
    }
    
    @RequestMapping("/reset")
    public Boolean reset() {
    	zone = new Zone("51.508742","-0.120850");
    	return true;
    }
    
    @RequestMapping("/rules")
    public List<Rule> rules() {
        
    	List<Rule> rules = new ArrayList<>();
    	
    	/*
    	 * this.name = name;
		this.dateFom = dateFom;
		this.dateTo = dateTo;
		this.days = days; list day
		this.notification = notification; list string
		this.notificationEnable = notificationEnable; 
		this.description = description;
		this.state = state;
		this.zone = zone;
    	 */
    	

    	Double lat = Double.valueOf(zone.getLat());
    	Double lng = Double.valueOf(zone.getLng());
    	
    	lat = lat - position;
    	lng = lng - position;
    	
    	zone.setLat(lat.toString());
    	zone.setLng(lng.toString());
    	
    	rules.add(new Rule("1","School", "08h00", "16h00", Day.getDays(true, true, true, true, true, false, false), true, true, true, "Profile permettant de surveiller les déplacements de mon enfant Profile permettant de surveiller les déplacements de mon enfant", "secure", new Zone("51.508742", "-0.120850", "1000"), zone));
    	rules.add(new Rule("2","Basketball", "19h00", "21h00", Day.getDays(false, false, true, true, false, false, true), true, false, false, "Profile permettant de surveiller les déplacements de mon enfant Profile permettant de surveiller les déplacements de mon enfant", "inactive", new Zone("40.508742", "-0.120850", "100"),new Zone("40.509742", "-0.120850")));
    	rules.add(new Rule("3","Other", "08h00", "9h00", Day.getDays(true, false, false, false, false, false, false), false, true, false, "Profile permettant de surveiller les déplacements de mon enfant Profile permettant de surveiller les déplacements de mon enfant", "unsecure", new Zone("30.508742", "-0.120850", "100"),new Zone("30.509742", "-0.120850")));
    	
    	
    	
    	
    	return rules;
    }
    
    
    
}
