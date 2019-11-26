import { Component, OnInit } from '@angular/core';
import { Email } from '../emails/email.model';
import { Subscription } from 'rxjs';
import { EmailsService } from './../emails/emails.service';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  emails: Email[] = [];
  private emailsSub: Subscription;

  constructor(private emailService: EmailsService) { }

  ngOnInit() {
    this.emailService.getEmails();
    this.emailsSub = this.emailService.getEmailUpdateListener()
    .subscribe((emails: Email[]) => {
      this.emails = emails;
    });
  }

  archiveEmail(emailToBeUpdated: string) {
    console.log("INBOX.COMPONENT.TS: " + emailToBeUpdated);
      this.emailService.archieveEmail(emailToBeUpdated);
  }

  deleteEmail(emailId: string) {
    this.emailService.deleteEmail(emailId);
  }

}
