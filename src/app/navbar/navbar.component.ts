import { Component, OnInit } from '@angular/core';
import { EmailsService } from './../emails/emails.service';
import { Email } from '../emails/email.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  emails: Email[] = [];
  private emailsSub: Subscription;
  filteredEmails: Email[];
  constructor(private emailService: EmailsService) { }

  ngOnInit() {
    this.emailService.getEmails();
    this.emailsSub = this.emailService.getEmailUpdateListener()
    .subscribe((emails: Email[]) => {
      this.emails = emails;
    });
  }
test() {
  alert();
}
  search(event: any) {
    console.log(event);
    this.filteredEmails = this.emails.filter((value) => {
      return value.from.toLowerCase().includes(event.target.value.toLowerCase())
      || value.subject.toLowerCase().includes(event.target.value.toLowerCase());
    })
  }

  ngOnDestroy() {
    this.emailsSub.unsubscribe();
  }

}
