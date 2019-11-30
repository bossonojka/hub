package hibernate.models;

import javax.persistence.*;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

@Entity
@Table(name = "orders")
public class Order {
	private int id;
	private Product product;
	private Provider provider;
	private int quantity;
	
	public static SessionFactory factory;
	
	public Order(Product product, Provider provider, int quantity) {
		super();
		this.product = product;
		this.provider = provider;
		this.quantity = quantity;
	}
	
	public Order() {
		
	}

	@Column(name = "quantity", nullable = false)
	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	@Id
	@GeneratedValue
	@Column(name = "id")
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	@ManyToOne
    @JoinColumn(name = "product_id") 
	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}

	@ManyToOne
    @JoinColumn(name = "provider_id") 
	public Provider getProvider() {
		return provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}
	
	public boolean create(){
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
		return this.id + " : " + this.product.getName() + " : " + this.provider.getName() + " : " + this.quantity;
	}
}
