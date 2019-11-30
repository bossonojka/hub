package hibernate.servlets;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibernate.models.Provider;

public class ProviderDelete extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ProviderDelete() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("provider") != null) {
			int providerId = Integer.parseInt(request.getParameter("provider"));
			
			List<Provider> providers = (CopyOnWriteArrayList<Provider>) getServletContext().getAttribute("providers");
			//List<Order> orders = (CopyOnWriteArrayList<Order>) getServletContext().getAttribute("orders");
			
			for (Provider p : providers) {
				if (p.getId() == providerId) {
					p.delete();
					providers.remove(p);
					
//					for (Order o: orders) {
//						if (o.getProvider().equals(p)) {
//							o.delete();
//							orders.remove(o);
//						}
//					}
				}
			}
			response.sendRedirect("./Providers");
		}
	}

}
