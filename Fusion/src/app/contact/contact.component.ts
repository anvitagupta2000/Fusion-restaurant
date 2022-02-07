import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Feedback, myChannel } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm: FormGroup;
  feedback: Feedback;
  myChannel = myChannel;
  submitted = null;
  showForm = true;

  formErrors = {
    'firstName': '',
    'lastName': '',
    'tel': '',
    'email': ''
  };

  validationMessages = {
    'firstName': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastName': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'tel': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder,
    private feedbackservice: FeedbackService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      tel: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      myChannel: 'None',
      comments: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback=this.feedbackForm.value;
    this.showForm = false;
    this.feedbackservice.postFeedback(this.feedback)
      .subscribe(feedback => {
         this.feedback = <Feedback>feedback;
         setTimeout(() => { this.feedback = null; this.showForm = true; }, 5000);
        },
        error => console.log(error.status, error.message));
    this.feedbackForm.reset({
      firstName: '',
      lastName: '',
      tel: '',
      email: '',
      agree: false,
      myChannel: 'None',
      comments: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
