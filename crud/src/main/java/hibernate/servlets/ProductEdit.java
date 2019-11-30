package hibernate.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibarnate.util.Validation;
import hibernate.models.Manufacturer;
import hibernate.models.Product;

public class ProductEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public ProductEdit() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("product") != null) {
			int productId = Integer.parseInt(request.getParameter("product"));
			
			List<Product> products = (CopyOnWriteArrayList<Product>) getServletContext().getAttribute("products");
			
			for (Product p : products) {
				if (p.getId() == productId) {
					request.setAttribute("product", p);
				}
			}
			request.setAttribute("products", products);
			request.getRequestDispatcher("products.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("name") != "" && request.getParameter("manufacturer") != "" && Validation.isDouble(request.getParameter("price")) && (request.getParameter("product") != "")) {
			int productId = Integer.parseInt(request.getParameter("product"));
			Integer manufacturer = Integer.parseInt(request.getParameter("manufacturer"));
			String name = request.getParameter("name");
			double price = Double.parseDouble(request.getParameter("price"));
			
			List<Product> products = (CopyOnWriteArrayList<Product>) getServletContext().getAttribute("products");
			List<Manufacturer> manufacturers = (CopyOnWriteArrayList<Manufacturer>) getServletContext().getAttribute("manufacturers");
			
			for (Product p : products) {
				if (p.getId() == productId) {
					for (Manufacturer m : manufacturers) {
						if (m.getId() == manufacturer) {
							p.setManufacturer(m);
						}
					}
					p.setName(name);
					p.setPrice(price);
					p.edit();
				}
			}
		}
		response.sendRedirect("./");
	}

}
