import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // const url = 'http://localhost:5000/api' + path;
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  
//  all properties and values for the currently authenticated User 
  async getUser() {
  }

  // creates a new user,
  async createNewUser() {
  
  }

  // returns the corresponding course 
  async getCourse(){
  
  }

  //  returns all courses including the User associated with each course
  async getAllCourses(){
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // creates a new course
  async createNewCourse(){

  }

  //updates the corresponding course
  async updateCourse(){

  }

  //deletes the corresponding course 
  async deleteCourse(){

  }

}
