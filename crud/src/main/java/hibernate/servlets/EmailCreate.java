package hibernate.servlets;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.mail.AuthenticationFailedException;
import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibarnate.util.FileHelper;
import hibarnate.util.XmlResponse;
import hibernate.models.Email;
import hibernate.models.Manufacturer;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;
import javassist.expr.NewArray;

public class EmailCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Product> products;
	private List<Provider> providers;
	private List<Order> orders;
	private List<Manufacturer> manufacturers;

    public void init(){
    	final Object products = getServletContext().getAttribute("products");
    	final Object providers = getServletContext().getAttribute("providers");
    	final Object manufacturers = getServletContext().getAttribute("manufacturers");
    	final Object orders = getServletContext().getAttribute("orders");
    	
    	if (products == null || !(products instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.products = (CopyOnWriteArrayList<Product>) products;
    	}
  
    	if (providers == null || !(providers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.providers = (CopyOnWriteArrayList<Provider>) providers;
    	}
    	
    	if (manufacturers == null || !(manufacturers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.manufacturers = (CopyOnWriteArrayList<Manufacturer>) manufacturers;
    	}

    	if (orders == null || !(orders instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.orders = (CopyOnWriteArrayList<Order>) orders;
    	}
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("email") != "" && request.getParameter("password") != "") {
			if (providers.isEmpty()) {
				request.setAttribute("error", "No email to send.");
				request.getRequestDispatcher("Providers").forward(request, response);
			} else {
				String subject = "Стек технологий Java (ЛР 5, Кулик В.В.)";
				
				String yourEmail = request.getParameter("email") + request.getParameter("domain");
				String yourPassword = request.getParameter("password");
				
				String tables = "";	
				
				FileHelper fh = new FileHelper("D:\\");
				
				ArrayList<File> files = new ArrayList<File>();
				switch(request.getParameter("table")) {
				case "products":
					files.add(fh.getProducts(this.products));
					tables += "products";
					break;
				case "providers":
					files.add(fh.getProviders(this.providers));
					tables += "providers";
					break;
				case "orders":
					files.add(fh.getOrders(this.orders));
					tables += "orders";
					break;
				case "manufacturers":
					files.add(fh.getManufacturers(this.manufacturers));
					tables += "manufacturers";
					break;
				case "all":
					files.add(fh.getProducts(this.products));
					files.add(fh.getProviders(this.providers));
					files.add(fh.getOrders(this.orders));
					files.add(fh.getManufacturers(this.manufacturers));
					tables += "products, providers, manufacturers, orders";
				}
				
				for (Provider p : this.providers) {
					String msg = "Table(s): "+tables+". Date: "+new SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(new Date())+".";
					Email email = new Email(p.getEmail(), subject, msg, files, yourEmail, yourPassword);
					try {
						email.send();
					} catch (AuthenticationFailedException e) {
						request.setAttribute("error", "Username and Password not accepted.");
						request.getRequestDispatcher("Providers").forward(request, response);
					} catch (MessagingException e) {
						request.setAttribute("error", e.getMessage());
						request.getRequestDispatcher("Providers").forward(request, response);
					}
				}
				request.setAttribute("success", "Message(s) was(were) sent successful.");
				request.getRequestDispatcher("Providers").forward(request, response);
			}
		} else {
			response.sendRedirect("Providers");
		}
	}

}
