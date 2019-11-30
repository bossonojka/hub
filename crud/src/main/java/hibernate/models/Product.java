package hibernate.models;

import java.util.List;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

@Entity
@Table(name = "products")
public class Product{
	private int id;
	private String name;
	private double price;
	private Manufacturer manufacturer;
	private List<Order> orders;

	@OneToMany(mappedBy="product")
	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public static SessionFactory factory;
	
	public Product(String name, double price, Manufacturer manufacturer) {
		super();
		this.name = name;
		this.price = price;
		this.manufacturer = manufacturer;
	}
	
	public Product() {
		
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id")
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(nullable = false, unique = true)
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(nullable = false)
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	@ManyToOne
	@JoinColumn(name= "manufacturer_id")
	public Manufacturer getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(Manufacturer manufacturer) {
		this.manufacturer = manufacturer;
	}
	
	public boolean create() throws PersistenceException{
		Session session = factory.openSession();
		session.beginTransaction();
		
		session.save(this);
		
		session.getTransaction().commit();
		session.close();
		
		return true;
	}
	
	public boolean delete(){
		Session session = factory.openSession();
		session.beginTransaction();
		
		session.delete(this);
		
		session.getTransaction().commit();
		session.close();
		
		return true;
	}
	
	public boolean edit(){
		Session session = factory.openSession();
		session.beginTransaction();
		
		session.update(this);
		
		session.getTransaction().commit();
		session.close();
		
		return true;
	}
	
	public String toString() {
		return this.id + " : " + this.manufacturer.getName() + " : " + this.name + " : " + this.price;
	}
}
