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

import hibernate.models.Product;

public class ProductDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ProductDelete() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("product") != null) {
			int productId = Integer.parseInt(request.getParameter("product"));
			
			List<Product> products = (CopyOnWriteArrayList<Product>) getServletContext().getAttribute("products");
			
			for (Product p : products) {
				if (p.getId() == productId) {
					p.delete();
					products.remove(p);
				}
			}
		}
		response.sendRedirect("./");
	}

}
