import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ManagerService, Contact, ContactData } from '../../services/manager.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})

export class DetailsComponent implements OnInit{
  @Input() contact!: Contact;
  isEditing: boolean;

  constructor(private manager: ManagerService, private router: Router, private route: ActivatedRoute) {
    this.isEditing = false;
  }

  ngOnInit(): void {
    // Get the contact from the id given in the route
    let id = parseInt(this.route.snapshot.paramMap.get('id') || '');
    let c = this.manager.getContact(id);
    if (!c) {
      // If the contact does not exist, we'll create a new one
      c = this.manager.newContact(new ContactData('New', 'Contact', '', '', ''));
      this.isEditing = true;
    }
    this.contact = c!;
  }

  back(): void {
    // Navigate back to the list
    this.router.navigate(['list']);
  }

  delete(): void {
    // Delete the contact and navigate back to the list
    this.manager.deleteContact(this.contact.id);
    this.back();
  }

  edit(): void {
    // Start editing
    this.isEditing = true;
  }

  save(): void {
    // Stop editing and update the contact
    this.manager.updateContact(this.contact);
    this.isEditing = false;
  }

  cancel(): void {
    // Stop editing
    this.isEditing = false;
  }
}
