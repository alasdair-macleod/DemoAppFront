import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable()
export class MathJaxService {
  constructor(private http: HttpClient) {
  }

  public getMessage() {
    return 'Flask service';
  }

  /**
  public getTexFromFlask(): Promise<String> {
    return this.http.post('http://127.0.0.1:5000/api/storedtex', '', this.jsonHeader())
      .toPromise().then(response => response.json().texString as String)
      .catch(this.handleError);
  }**/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private jsonHeader() {
    const header = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return header;
  }
}
