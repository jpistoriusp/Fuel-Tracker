package controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.FuelTrackerDAO;
import entities.FillUp;

@RestController
public class FuelTrackerController {

	@Autowired
	private FuelTrackerDAO fuelTrackerDAO;

	@RequestMapping(path = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}

	@RequestMapping(path = "fueltracker", method = RequestMethod.GET)
	public List<FillUp> index() {
		return fuelTrackerDAO.index();
	}

	@RequestMapping(path = "fueltracker/{id}", method = RequestMethod.GET)
	public FillUp show(@PathVariable int id) {
		return fuelTrackerDAO.show(id);
	}

	@RequestMapping(path = "fueltracker", method = RequestMethod.POST)
	public FillUp create(@RequestBody String quizJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		FillUp mappedFillUp = null;
		try {
			mappedFillUp = mapper.readValue(quizJSON, FillUp.class);
			mappedFillUp = fuelTrackerDAO.create(mappedFillUp);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mappedFillUp;
	}

	@RequestMapping(path = "fueltracker/{id}", method = RequestMethod.PUT)
	public FillUp update(@PathVariable int id, @RequestBody String quizJSON, HttpServletResponse res) {
		ObjectMapper mapper = new ObjectMapper();
		FillUp mappedQuiz = null;
		try {
			mappedQuiz = mapper.readValue(quizJSON, FillUp.class);
			mappedQuiz = fuelTrackerDAO.update(id, mappedQuiz);
		} catch (Exception e) {
			res.setStatus(404);
		}
		return mappedQuiz;
	}

	@RequestMapping(path = "fueltracker/{id}", method = RequestMethod.DELETE)
	public boolean destroy(@PathVariable int id) {
		return fuelTrackerDAO.destroy(id);
	}
}
