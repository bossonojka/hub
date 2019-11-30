package hibernate.servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibernate.models.Order;

public class OrderDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public OrderDelete() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("order") != null) {
			int orderId = Integer.parseInt(request.getParameter("order"));
			
			List<Order> orders = (CopyOnWriteArrayList<Order>) getServletContext().getAttribute("orders");
			
			for (Order o : orders) {
				if (o.getId() == orderId) {
					o.delete();
					orders.remove(o);	
				}
			}
		
			response.sendRedirect("./Orders");
		}
	}

}
