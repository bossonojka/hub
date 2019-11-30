package hibernate.servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibarnate.util.Validation;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class OrderCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Order> orders;
	private AtomicInteger id;
   
    public OrderCreate() {
        super();
        
    }
    
    public void init() {
    	final Object orders = getServletContext().getAttribute("orders");
    	
    	if (orders == null || !(orders instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.orders = (CopyOnWriteArrayList<Order>) orders;
    	}
    	if (!this.orders.isEmpty()) {
    		this.id = new AtomicInteger(this.orders.get(this.orders.size() - 1).getId() + 1);
    	} else {
    		this.id = new AtomicInteger(1);
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("Orders");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("product") != "" && request.getParameter("provider") != "" && Validation.isInteger(request.getParameter("quantity"))) {
			int id = this.id.getAndIncrement();
			int productId = Integer.parseInt(request.getParameter("product"));
			int providerId = Integer.parseInt(request.getParameter("provider"));
			int quantity = Integer.parseInt(request.getParameter("quantity"));
			
			List<Product> products = (CopyOnWriteArrayList<Product>) getServletContext().getAttribute("products");
			List<Provider> providers = (CopyOnWriteArrayList<Provider>) getServletContext().getAttribute("providers");
			
			Product product = null;
			for (Product p : products) {
				if (p.getId() == productId) {
					product = p;
				}
			}

			Provider provider = null;
			for (Provider p : providers) {
				if (p.getId() == providerId) {
					provider = p;
				}
			}
			
			Order order = new Order(product, provider, quantity);
			boolean result = order.create() ? orders.add(order) : false;
		}
		response.sendRedirect("Orders");
	}

}
