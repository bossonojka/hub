package hibarnate.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.ServletContext;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;

import hibernate.models.Manufacturer;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class Repository {
	private SessionFactory factory;
	
	private List<Manufacturer> manufacturers = new CopyOnWriteArrayList<Manufacturer>();
	private List<Product> products = new CopyOnWriteArrayList<Product>();
	private List<Provider> providers = new CopyOnWriteArrayList<Provider>();
	private List<Order> orders = new CopyOnWriteArrayList<Order>();
	
	public Repository(SessionFactory factory) {
		this.factory = factory;
	}
	
	public List<Manufacturer> getManufacturers() {
		Session session = factory.openSession();
		session.beginTransaction();
		
		List<Manufacturer> manufacturers = session.createQuery("from Manufacturer", Manufacturer.class).list();
		
		for (Manufacturer m : manufacturers) {
			this.manufacturers.add(m);
		}
		
		session.getTransaction().commit();
		session.close();
		
		return this.manufacturers;
	}
	
	public List<Product> getProducts() {
		Session session = factory.openSession();
        session.beginTransaction();
        
        List<Product> products = session.createQuery("from Product", Product.class).list();
         
        for (Product p : products) {
			this.products.add(p);
		}
         
        session.getTransaction().commit();
        session.close(); 
		
		return this.products;
	}
	
	public List<Provider> getProviders() {
		Session session = factory.openSession();
        session.beginTransaction();
        
        List<Provider> providers = session.createQuery("from Provider", Provider.class).list();
         
        for (Provider p : providers) {
			this.providers.add(p);
		}
         
        session.getTransaction().commit();
        session.close(); 
		
		return this.providers;
	}
	
	public List<Order> getOrders() {
		Session session = factory.openSession();
        session.beginTransaction();
        
        List<Order> orders = session.createQuery("from Order", Order.class).list();
        for (Order o : orders) {
			this.orders.add(o);
		}
         
        session.getTransaction().commit();
        session.close(); 
		
		return this.orders;
	}
}
