from locust import HttpUser, task
import json

class WebsiteUser(HttpUser):
	min_wait = 5000
	max_wait = 15000

	@task
	def index(self):
		self.client.get("/graphql?query={me{name, email, collegeList}}",
				   headers={'content-type' : 'application/json'})