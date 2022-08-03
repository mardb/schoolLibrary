import { Buffer } from 'buffer';

export default class Data {

  //sends GET/PUT/POST/DELETE requests to API
  api(
    path,
    method = 'GET',
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = 'http://localhost:5000/api' + path;
//automatically applies theses settings to a request to API
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
//this provides aut for endpoints that require it. 
    if (requiresAuth) {
      const encodedCredentials = Buffer.from(
        `${credentials.emailAddress}:${credentials.password}`
      ).toString('base64');
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //  all properties and values for the currently authenticated User
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // creates a new user,
  async createUser(user) {
    const response = await this.api(`/users`, 'POST', user);
    if (response.status === 201) {
      return response.json().then((data) => data);
    } else if (response.status === 400) {
      return response.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  // returns the corresponding course
  async courseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then((data) => {
        return data.course;
      });
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //  returns all courses including the User associated with each course
  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then((data) => {
        return data.courses;
      });
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  // creates a new course
  async createCourse(course, credentials) {
    const { emailAddress, password } = credentials;
    try {
      const response = await this.api('/courses', 'POST', course, true, {
        emailAddress,
        password,
      });
      if (response.status === 201) {
        return [];
      } else if (response.status === 400) {
        return response.json().then((data) => data);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error;
    }
  }

  //updates the corresponding course -
  // async updateCourse(course, user, id){
  // const {emailAddress, password} = user;
  async updateCourse(course, credentials) {
    const { emailAddress, password } = credentials;

    const response = await this.api(
      `/courses/${course.id}`,
      'PUT',
      course,
      true,
      {
        emailAddress,
        password,
      }
    );

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  //deletes the corresponding course
  async deleteCourse(id, credentials) {
    const { emailAddress, password } = credentials;

    const response = await this.api(`/courses/${id}`, 'DELETE', true, {
      emailAddress,
      password,
    });

    if (response.status === 204) {
      console.log(response);
    } else if (response.status === 404) {
      console.log(response);
    } else {
      throw new Error();
    }
  }
}
