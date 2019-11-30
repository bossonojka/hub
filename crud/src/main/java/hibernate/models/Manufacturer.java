package hibernate.models;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Set;

import javax.persistence.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

@Entity
@Table(name="manufacturers")
public class Manufacturer {
	private int id;
	private String name;
	public static SessionFactory factory;
	private Set<Product> products;
	
	public Manufacturer(String name) {
		super();
		this.name = name;
	}
	
	public Manufacturer() {
		
	}
	
	@Id
	@GeneratedValue
	@Column(name = "manufacturer_id")
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
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "manufacturer", orphanRemoval = true)
    public Set<Product> getProducts() {
        return this.products;
    }
	
	public void setProducts(Set<Product> products) {
        this.products = products;
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
		return this.id + " : " + this.name;
	}
}
