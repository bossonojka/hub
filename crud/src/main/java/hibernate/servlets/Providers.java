package hibernate.servlets;

import java.beans.XMLDecoder;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
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

import hibernate.models.Provider;

public class Providers extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Provider> providers;
       
    public Providers() {
        super();
        
    }
    
    public void init() {
    	final Object providers = getServletContext().getAttribute("providers");
    	final String path = getServletContext().getInitParameter("xmlPath") + getServletContext().getInitParameter("providersPath");
    	
    	if (providers == null || !(providers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.providers = (CopyOnWriteArrayList<Provider>) providers;
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("providers", providers);
		request.getRequestDispatcher("providers.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
