package hibernate.servlets;

import java.beans.XMLDecoder;
import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import hibernate.models.Manufacturer;
import hibernate.models.Product;

public class Products extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Product> products;
       
    public Products() {
        super();
    }

    public void init(){
    	final Object products = getServletContext().getAttribute("products");
    	
    	if (products == null || !(products instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.products = (CopyOnWriteArrayList<Product>) products;
    	}
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		request.setAttribute("products", products);
		request.getRequestDispatcher("products.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("manufacturer") != null) {
			Integer manufacturer = Integer.parseInt(request.getParameter("manufacturer"));
			List<Product> products = new CopyOnWriteArrayList<Product>();
			
			for (Product p : this.products) {
				if(p.getManufacturer().getId() == manufacturer) {
					products.add(p);
				}
			}
			request.setAttribute("products", products);
			request.getRequestDispatcher("/products.jsp").forward(request, response);
		}
	}
}
