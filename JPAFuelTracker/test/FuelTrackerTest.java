import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.FillUp;

public class FuelTrackerTest {
	private EntityManager em = null;

	@Before
	public void setUp() throws Exception {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("FuelTrackerRest");
		em = emf.createEntityManager();
	}

	@After
	public void tearDown() throws Exception {
		if (em != null) {
			em.close();
		}
	}

	@Test
	public void test() {
		Boolean expectedName = true;
		assertEquals(true, expectedName);
	}
}