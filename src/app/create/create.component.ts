import { Email } from './../emails/email.model';
import { EmailsService } from './../emails/emails.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  to = '';
  subject = '';
  content = '';
  sent = false;

  constructor(public emailsService: EmailsService) { }

  ngOnInit() {
  }

  onAddEmail(form: NgForm) {
    if(form.invalid) {
      return;
    }
    else {
      this.sent = true;
      this.emailsService.addEmail(null, form.value.toInput, 'proud@weusthem.ca', form.value.subjectInput, form.value.contentInput, false, true);
      form.resetForm();
      }
      this.sent = false;
    }
  }
