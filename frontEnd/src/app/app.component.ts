import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `<div class="testbox">
  <form action="/">
    <div class="banner">
      <h1>Importar Transações</h1>
    </div>
    <div class="item">
      <p>Escolher Ficheiro</p>
      <input type="file" name="transactionFile" id="transactionFile" (change)="onFileChange($event)" accept=".txt, .csv"/>
    </div>
    <div class="btn-block">
      <button type="button" (click)="importFile()">Importar</button>
    </div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Loja</th>
      <th scope="col">Dono da Loja</th>
      <th scope="col">Tipo de Transação</th>
      <th scope="col">Data de ocorrência</th>
      <th scope="col">CPF Beneficiário</th>
      <th scope="col">Número do cartão</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let trx of transactions; index as i">
      <th scope="row">{{ i + 1 }}</th>
      <td>{{ trx.store_name}}</td>
      <td>{{ trx.owner_name}}</td>
      <td>{{ trx.transaction_type}}</td>
      <td>{{ formatDate(trx.occurrency_date)}}</td>
      <td>{{ trx.cpf_benefited}}</td>
      <td>{{ trx.card_number}}</td>
    </tr>
  </tbody>
</table>
  </form>
</div>
`
})
export class AppComponent {
  title = 'Transações';
  file: any = '';

  transactions: any[] = [];
  constructor(private http: HttpClient) {

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  importFile() {
    const formData = new FormData();
    formData.append('file', this.file);
    this.http.post<any>(environment.baseUrl + 'transactions/upload-file', formData)
      .subscribe(
        (res) => {
          if (res.code == 200) {
            alert(res.message);
            this.transactions = res.data;
          }
        }
      );
  }

  formatDate(date: any) {
    return new Date(date).toLocaleString('en-US');
  }
}
