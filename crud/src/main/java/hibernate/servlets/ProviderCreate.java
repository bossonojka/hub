package hibernate.servlets;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.persistence.PersistenceException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hibernate.models.Provider;

public class ProviderCreate extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private List<Provider> providers;

    public ProviderCreate() {
        super();
    }

    public void init() {
    	final Object providers = getServletContext().getAttribute("providers");
    	
    	if (providers == null || !(providers instanceof CopyOnWriteArrayList)) {
    		throw new IllegalStateException();
    	} else {
    		this.providers = (CopyOnWriteArrayList<Provider>) providers;
    	}
    }
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("Providers");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("name") != "" && request.getParameter("email") != "") {
			String name = request.getParameter("name");
			String email = request.getParameter("email");
			
			Provider provider = new Provider(name, email);
			try {
				boolean result = provider.create() ? providers.add(provider) : false;
			} catch (PersistenceException e) {
				
			}
		}
		response.sendRedirect("Providers");
	}
}
