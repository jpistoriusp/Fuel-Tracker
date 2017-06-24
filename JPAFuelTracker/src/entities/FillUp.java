package entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FillUp {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private double gallons;
	private double price;
	private int startMiles;
	private int endMiles;
	
	FillUp() {}

	public FillUp(int id, double gallons, double price, int startMiles, int endMiles) {
		this.id = id;
		this.gallons = gallons;
		this.price = price;
		this.startMiles = startMiles;
		this.endMiles = endMiles;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getGallons() {
		return gallons;
	}

	public void setGallons(double gallons) {
		this.gallons = gallons;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getStartMiles() {
		return startMiles;
	}

	public void setStartMiles(int startMiles) {
		this.startMiles = startMiles;
	}

	public int getEndMiles() {
		return endMiles;
	}

	public void setEndMiles(int endMiles) {
		this.endMiles = endMiles;
	}

	@Override
	public String toString() {
		return "FillUp [id=" + id + ", gallons=" + gallons + ", price=" + price + ", startMiles=" + startMiles
				+ ", endMiles=" + endMiles + "]";
	}
}
