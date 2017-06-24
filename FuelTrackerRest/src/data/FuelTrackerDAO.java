package data;

import java.util.List;

import entities.FillUp;

public interface FuelTrackerDAO {
	public List<FillUp> index();
	public FillUp show(int id);
	public FillUp create(FillUp fillup);
	public FillUp update(int id, FillUp fillup);
	public boolean destroy(int id);
}
