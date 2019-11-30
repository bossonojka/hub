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

import hibernate.models.Manufacturer;

public class ManufacturerCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Manufacturer> manufacturers;
       
    public ManufacturerCreate() {
        super();
    }
    
    public void init() {
    	final Object manufacturers = getServletContext().getAttribute("manufacturers");
    	
    	if (manufacturers == null || !(manufacturers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.manufacturers = (CopyOnWriteArrayList<Manufacturer>) manufacturers;
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("Manufacturers");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("name") != "") {
			String name = request.getParameter("name");
			
			Manufacturer manufacturer = new Manufacturer(name);
			try {
				boolean result = manufacturer.create() ? manufacturers.add(manufacturer) : false;
			} catch (PersistenceException e) {
				
			}
		}
		response.sendRedirect("Manufacturers");
	}
}
