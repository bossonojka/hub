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

public class ProviderEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ProviderEdit() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("provider") != null) {
			int providerId = Integer.parseInt(request.getParameter("provider"));
			
			List<Provider> providers = (CopyOnWriteArrayList<Provider>) getServletContext().getAttribute("providers");
			
			for (Provider p : providers) {
				if (p.getId() == providerId) {
					request.setAttribute("provider", p);
				}
			}
			request.setAttribute("providers", providers);
			request.getRequestDispatcher("providers.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("name") != "" && request.getParameter("email") != "" && request.getParameter("provider") != "") {
			int providerId = Integer.parseInt(request.getParameter("provider"));
			String email = request.getParameter("email");
			String name = request.getParameter("name");
			
			List<Provider> providers = (CopyOnWriteArrayList<Provider>) getServletContext().getAttribute("providers");
			
			for (Provider p : providers) {
				if (p.getId() == providerId) {
					p.setEmail(email);
					p.setName(name);
					p.edit();
				}
			}
		}
		response.sendRedirect("Providers");
	}
}
