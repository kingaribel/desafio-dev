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
  </form>
</div>
`
})
export class AppComponent {
  title = 'Transações';
  file: any = '';
  constructor(private http: HttpClient) {

  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  importFile() {
    const formData = new FormData();
    console.log(this.file)
    formData.append('file', this.file);
    this.http.post<any>(environment.baseUrl + 'transactions/upload-file', formData)
      .subscribe(
        (res) => {
          if (res.code == 200) {
            alert(res.message);
          }
        }
      );

  }
}
