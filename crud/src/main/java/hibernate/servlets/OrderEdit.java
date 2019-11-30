package hibernate.servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibarnate.util.Validation;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class OrderEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public OrderEdit() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("order") != null) {
			int orderId = Integer.parseInt(request.getParameter("order"));
			
			List<Order> orders = (CopyOnWriteArrayList<Order>) getServletContext().getAttribute("orders");
			
			for (Order p : orders) {
				if (p.getId() == orderId) {
					request.setAttribute("order", p);
				}
			}
			request.setAttribute("orders", orders);
			request.getRequestDispatcher("orders.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("product") != "" && request.getParameter("provider") != "" && Validation.isInteger(request.getParameter("quantity")) && request.getParameter("order") != "") {
			int orderId = Integer.parseInt(request.getParameter("order"));
			int productId = Integer.parseInt(request.getParameter("product"));
			int providerId = Integer.parseInt(request.getParameter("provider"));
			int quantity = Integer.parseInt(request.getParameter("quantity"));
			
			List<Order> orders = (CopyOnWriteArrayList<Order>) getServletContext().getAttribute("orders");
			List<Product> products = (CopyOnWriteArrayList<Product>) getServletContext().getAttribute("products");
			List<Provider> providers = (CopyOnWriteArrayList<Provider>) getServletContext().getAttribute("providers");
			
			for (Order o : orders) {
				if (o.getId() == orderId) {
					for (Product prod : products) {
						if (prod.getId() == productId) {
							o.setProduct(prod);
						}
					}
					for (Provider prov : providers) {
						if (prov.getId() == providerId) {
							o.setProvider(prov);
						}
					}
					o.setQuantity(quantity);
					o.edit();
				}
			}
		}
		response.sendRedirect("Orders");
	}

}
