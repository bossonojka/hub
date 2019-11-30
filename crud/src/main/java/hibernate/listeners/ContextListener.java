package hibernate.listeners;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.hibernate.SessionFactory;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

import hibarnate.util.Repository;
import hibernate.models.Manufacturer;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class ContextListener implements ServletContextListener {
	
	private SessionFactory factory;

	public void contextInitialized(ServletContextEvent sce) {
		final ServletContext ctx = sce.getServletContext();

		StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure().build(); 
		factory = new MetadataSources(registry).buildMetadata().buildSessionFactory(); 
		
		Manufacturer.factory = Provider.factory = Order.factory = Product.factory = factory;
		
		Repository repo = new Repository(factory);
		
		ctx.setAttribute("manufacturers", repo.getManufacturers());
		ctx.setAttribute("products", repo.getProducts());
		ctx.setAttribute("providers", repo.getProviders());
		ctx.setAttribute("orders", repo.getOrders());
	}

	public void contextDestroyed(ServletContextEvent sce) {
		
	}
}
