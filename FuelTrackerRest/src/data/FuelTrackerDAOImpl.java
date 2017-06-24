package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.FillUp;

@Transactional
public class FuelTrackerDAOImpl implements FuelTrackerDAO {

	@PersistenceContext
	private EntityManager em;
	
	@Override
	public List<FillUp> index() {
		String query = "SELECT f FROM FillUp f";
		return em.createQuery(query, FillUp.class).getResultList();
	}

	@Override
	public FillUp show(int id) {
		return em.find(FillUp.class, id);
	}

	@Override
	public FillUp create(FillUp fillup) {
		em.persist(fillup);
		em.flush();
		return fillup;
	}

	@Override
	public FillUp update(int id, FillUp fillup) {
		FillUp managed = em.find(FillUp.class, id);
		managed.setEndMiles(fillup.getEndMiles());
		managed.setStartMiles(fillup.getStartMiles());
		managed.setGallons(fillup.getGallons());
		managed.setPrice(fillup.getPrice());
		return managed;
	}

	@Override
	public boolean destroy(int id) {
		try {
			FillUp temp = em.find(FillUp.class, id);
			em.remove(temp);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
