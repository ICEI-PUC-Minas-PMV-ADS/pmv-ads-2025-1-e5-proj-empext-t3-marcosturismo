import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  listarClientes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  salvarCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}
