package hibarnate.util;

import java.beans.ExceptionListener;
import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.IntStream;

import javax.servlet.ServletContext;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import hibernate.models.Manufacturer;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class XmlResponse {
	private HttpServletResponse response;
	
	public XmlResponse(HttpServletResponse response){
		this.response = response;
	}
	
	public void getProducts(List<Product> products) throws IOException {
		ServletOutputStream sos = this.response.getOutputStream();
		XMLEncoder encoder = new XMLEncoder(sos);
		
		for (Product p : products) {
        	encoder.writeObject(p);
        }
		
		encoder.close();
        sos.close();
	}
	
	public void getProviders(List<Provider> providers) throws IOException {
		ServletOutputStream sos = this.response.getOutputStream();
		XMLEncoder encoder = new XMLEncoder(sos);
		
		for (Provider p : providers) {
        	encoder.writeObject(p);
        }
		
		encoder.close();
        sos.close();
	}
	
	public void getOrders(List<Order> orders) throws IOException {
		ServletOutputStream sos = this.response.getOutputStream();
		XMLEncoder encoder = new XMLEncoder(sos);
		
		for (Order o : orders) {
        	encoder.writeObject(o);
        }
		
		encoder.close();
        sos.close();
	}
	
	public void getManufacturers(List<Manufacturer> manufacturers) throws IOException {
		ServletOutputStream sos = this.response.getOutputStream();
		XMLEncoder encoder = new XMLEncoder(sos);
		
		for (Manufacturer m : manufacturers) {
        	encoder.writeObject(m);
        }
		
		encoder.close();
        sos.close();
	}
}
