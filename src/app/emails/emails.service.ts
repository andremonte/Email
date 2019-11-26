import { Email } from './email.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailsService {
  private emails: Email[] = [];
  emailss;
  private emailsUpdated = new Subject<Email[]>();

  constructor(private http: HttpClient) { }


  getEmails() {
    this.http
    .get<{ message: string, emails: any }>(
      "http://localhost:3000/api/emails"
      )
      .pipe(map((emailData) => {
        return emailData.emails.map(email => {
          return {
            id: email._id,
            from: email.from,
            to: email.to,
            subject: email.subject,
            content: email.content,
            archive: email.archive,
            enviada: email.enviada,
            open: email.open
          };
        });
      }))
      .subscribe(transFormedEmails => {
        this.emails = transFormedEmails;
        this.emailsUpdated.next([...this.emails]);
      });

  }
  getEmailUpdateListener() {
    return this.emailsUpdated.asObservable();
  }

  addEmail(id: string, from: string, to: string, subject: string, content: string, archive: boolean, enviada: boolean) {
    const email: Email = {id: null, from: from, to: to, subject: subject, content: content, archive: archive, enviada: enviada};
    this.http.post<{message: string, }>("http://localhost:3000/api/email", email)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.emails.push(email);
      this.emailsUpdated.next([...this.emails]);
    });
  }

  deleteEmail(emailId: string) {

    this.http.delete("http://localhost:3000/api/emails/" + emailId)
    .subscribe(() => {
      const updatedEmails = this.emails.filter(email => email.id !== emailId);
      this.emails = updatedEmails;
      this.emailsUpdated.next([...this.emails]);
      });
    }

  archieveEmail(emailId: string) {
    this.http.put('http://localhost:3000/api/emails/' + emailId, null).subscribe();
    console.log("EMAILS.SERVICE.TS: " + emailId);
  };

  DesarchieveEmail(emailId: string) {
    this.http.put('http://localhost:3000/api/email/' + emailId, null).subscribe();
    console.log("EMAILS.SERVICE.TS: " + emailId);
  };

  }
