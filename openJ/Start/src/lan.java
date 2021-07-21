
public class lan {
	
	public static void main(String[] args) {
		
		System.out.println( "OpenJUMP is starting: buckle up!" );
		String[] param = new String[4];
		param[0] ="-default-plugins";
		param[1] ="/Users/vincenzo/Desktop/OpenJUMP 1.16 rev.6669 CORE.app/bin/default-plugins.xml";
		param[2] ="-properties";
		param[3] ="/Users/vincenzo/Documents/Unipd LM/sit/Openj/Start/src/paperino.xml";
		
		
		com.vividsolutions.jump.workbench.JUMPWorkbench.main( param );
		
		
	}
}