package hibarnate.util;

public class Validation {
	public static boolean isInteger(String str) {
	    if (str == null || str.isEmpty()) return false;
	    for (int i = 0; i < str.length(); i++) {
	        if (!Character.isDigit(str.charAt(i))) return false;
	    }
	    return true;
	}
	
	public static boolean isDouble(String str){
		   return str.matches("\\d+\\.\\d+") || str.matches("\\d+");
		}
}
