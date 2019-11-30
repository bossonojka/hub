package hibernate.servlets;

import java.beans.XMLDecoder;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.IntStream;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import hibernate.models.Order;

public class Orders extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Order> orders;
       
    public Orders() {
        super(); 
    }
    
    public void init(){
    	final Object orders = getServletContext().getAttribute("orders");
    	
    	if (orders == null || !(orders instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.orders = (CopyOnWriteArrayList<Order>) orders;
    	}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("orders", orders);
		request.getRequestDispatcher("orders.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("provider") != null) {
			String provider = request.getParameter("provider");
			List<Order> orders = new CopyOnWriteArrayList<Order>();
			
			for (Order o : this.orders) {
				if(o.getProvider().getName().equals(provider)) {
					orders.add(o);
				}
			}
			request.setAttribute("orders", orders);
			request.getRequestDispatcher("/orders.jsp").forward(request, response);
		}
	}

}
