package hibernate.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibernate.models.Manufacturer;
import hibernate.models.Product;


public class ManufacturerDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ManufacturerDelete() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("manufacturer") != null) {
			int manufacturerId = Integer.parseInt(request.getParameter("manufacturer"));
			
			List<Manufacturer> manufacturers = (CopyOnWriteArrayList<Manufacturer>) getServletContext().getAttribute("manufacturers");
			List<Product> products = (CopyOnWriteArrayList<Product>) getServletContext().getAttribute("products");
			
			for (Manufacturer m : manufacturers) {
				if (m.getId() == manufacturerId) {
					m.delete();
					manufacturers.remove(m);
					
					for (Product p: products) {
						if (p.getManufacturer().equals(m)) {
							p.delete();
							products.remove(p);
						}
					}
				}
			}
		}
		response.sendRedirect("./Manufacturers");
	}

}
