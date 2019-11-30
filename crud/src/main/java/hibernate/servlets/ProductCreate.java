package hibernate.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import javax.persistence.PersistenceException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibarnate.util.Validation;
import hibernate.models.Manufacturer;
import hibernate.models.Product;

public class ProductCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Product> products;
       
    public ProductCreate() {
        super();
    }
    
    public void init() {
    	final Object products = getServletContext().getAttribute("products");
    	
    	if (products == null || !(products instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.products = (CopyOnWriteArrayList<Product>) products;
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("./");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("name") != "" && request.getParameter("manufacturer") != "" && Validation.isDouble(request.getParameter("price"))) {
			Integer manufacturerId = Integer.parseInt(request.getParameter("manufacturer"));
			String name = request.getParameter("name");
			double price = Double.parseDouble(request.getParameter("price"));
			
			List<Manufacturer> manufacturers = (CopyOnWriteArrayList<Manufacturer>) getServletContext().getAttribute("manufacturers");
			
			Manufacturer manufacturer = null;
			for (Manufacturer m : manufacturers) {
				if (m.getId() == manufacturerId) {
					manufacturer = m;
				}
			}
			
			Product product = new Product(name, price, manufacturer);
			try {
				boolean result = product.create() ? products.add(product) : false;
			} catch (PersistenceException e) {
				
			}
		}
		response.sendRedirect("./");
	}
}
