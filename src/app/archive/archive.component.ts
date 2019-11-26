import { EmailsService } from './../emails/emails.service';
import { Component, OnInit } from '@angular/core';
import { Email } from '../emails/email.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
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

  unarchiveEmail(emailToBeUpdated: string) {
    console.log("INBOX.COMPONENT.TS: " + emailToBeUpdated);
      this.emailService.DesarchieveEmail(emailToBeUpdated);
  }

  deleteEmail(emailId: string) {
    this.emailService.deleteEmail(emailId);
  }

}
