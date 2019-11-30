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

public class Manufacturers extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Manufacturer> manufacturers;
       
    public Manufacturers() {
        super();
    }
    
    public void init(){
    	final Object manufacturers = getServletContext().getAttribute("manufacturers");
    	
    	if (manufacturers == null || !(manufacturers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.manufacturers = (CopyOnWriteArrayList<Manufacturer>) manufacturers;
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		request.setAttribute("manufacturers", manufacturers);
		request.getRequestDispatcher("manufacturers.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
