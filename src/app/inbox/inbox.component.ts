import { EmailsService } from './../emails/emails.service';
import { Component, OnInit } from '@angular/core';
import { Email } from '../emails/email.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
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
    console.log("INBOX.COMPONENT.TS: " + emailId);
    this.emailService.deleteEmail(emailId);
  }

  ngOnDestroy() {
    this.emailsSub.unsubscribe();
  }
}
