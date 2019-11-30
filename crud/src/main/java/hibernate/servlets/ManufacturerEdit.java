package hibernate.servlets;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibernate.models.Manufacturer;

public class ManufacturerEdit extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ManufacturerEdit() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("manufacturer") != null) {
			int manufacturerId = Integer.parseInt(request.getParameter("manufacturer"));
			
			List<Manufacturer> manufacturers = (CopyOnWriteArrayList<Manufacturer>) getServletContext().getAttribute("manufacturers");
			
			for (Manufacturer m : manufacturers) {
				if (m.getId() == manufacturerId) {
					request.setAttribute("manufacturer", m);
				}
			}
			request.setAttribute("manufacturers", manufacturers);
			request.getRequestDispatcher("manufacturers.jsp").forward(request, response);
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("name") != "") {
			int manufacturerId = Integer.parseInt(request.getParameter("manufacturer"));
			String name = request.getParameter("name");
			
			List<Manufacturer> manufacturers = (CopyOnWriteArrayList<Manufacturer>) getServletContext().getAttribute("manufacturers");
			
			for (Manufacturer m : manufacturers) {
				if (m.getId() == manufacturerId) {
					m.setName(name);
					m.edit();
				}
			}
		}
		response.sendRedirect("Manufacturers");
	}

}
