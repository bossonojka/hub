package hibernate.servlets;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibarnate.util.XmlResponse;
import hibernate.models.Manufacturer;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class XmlCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	//private List<Order> orders;
	private List<Product> products;
	private List<Provider> providers;
	private List<Manufacturer> manufacturers;
	private List<Order> orders;
	private XmlResponse xmlr;

    public XmlCreate() {
        super();
    }
    
    public void init() {
    	final Object orders = getServletContext().getAttribute("orders");
    	final Object products = getServletContext().getAttribute("products");
    	final Object providers = getServletContext().getAttribute("providers");
    	final Object manufacturers = getServletContext().getAttribute("manufacturers");
    	
    	if (orders == null || !(orders instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.orders = (CopyOnWriteArrayList<Order>) orders;
    	}
    	
    	if (products == null || !(products instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.products = (CopyOnWriteArrayList<Product>) products;
    	}
    	
    	if (providers == null || !(providers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.providers = (CopyOnWriteArrayList<Provider>) providers;
    	}
    	
    	if (manufacturers == null || !(manufacturers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.manufacturers = (CopyOnWriteArrayList<Manufacturer>) manufacturers;
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		switch(request.getParameter("type")) {
			case "products":
				new XmlResponse(response).getProducts(this.products);
				break;
			case "providers":
				new XmlResponse(response).getProviders(this.providers);
				break;
			case "orders":
				new XmlResponse(response).getOrders(this.orders);
				break;
			case "manufacturers":
				new XmlResponse(response).getManufacturers(this.manufacturers);
				break;
		}
	}
}
