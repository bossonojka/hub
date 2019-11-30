package hibarnate.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.List;

import hibernate.models.Manufacturer;
import hibernate.models.Order;
import hibernate.models.Product;
import hibernate.models.Provider;

public class FileHelper {
	private String path;
	
	public FileHelper(String path) {
		this.path = path;
	}
	
	public File getProducts(List<Product> products) {
		try {
			FileWriter writer = new FileWriter(this.path + "products.txt");
			for (Product p : products) {
				writer.write(p.toString() + "\n");
			}
			writer.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new File(this.path + "products.txt");
	}
	
	public File getProviders(List<Provider> providers) {
		try {
			FileWriter file = new FileWriter(this.path + "providers.txt");
			for (Provider p : providers) {
				file.write(p.toString() + "\n");
			}
			file.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new File(this.path + "providers.txt");
	}
	
	public File getOrders(List<Order> orders) {
		try {
			FileWriter file = new FileWriter(this.path + "orders.txt");
			for (Order o : orders) {
				file.write(o.toString() + "\n");
			}
			file.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new File(this.path + "orders.txt");
	}
	
	public File getManufacturers(List<Manufacturer> manufacturers) {
		try {
			FileWriter file = new FileWriter(this.path + "manufacturers.txt");
			for (Manufacturer m : manufacturers) {
				file.write(m.toString() + "\n");
			}
			file.flush();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new File(this.path + "manufacturers.txt");
	}
}
