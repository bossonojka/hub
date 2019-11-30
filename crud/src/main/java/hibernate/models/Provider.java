package hibernate.models;

import java.util.List;

import javax.persistence.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

@Entity
@Table(name = "providers")
public class Provider {
	private int id;
	private String name;
	private String email;
	private List<Order> orders;
	
	@OneToMany(mappedBy="provider")	
	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public static SessionFactory factory;
	
	public Provider(String name, String email) {
		super();
		this.name = name;
		this.email = email;
	}
	
	public Provider() {
		
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
	
	@Column(nullable = false, unique = true)
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
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
		return this.id + " : " + this.name + " : " + this.email;
	}
}
