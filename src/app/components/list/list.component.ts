import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';

import { ManagerService, Contact } from '../../services/manager.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles:[]
})

export class ListComponent implements OnInit {
  contacts!: Contact[];
  sortParams: SortParams;

  constructor(private manager: ManagerService, private router: Router) {
    this.sortParams = new SortParams('firstName', 'asc');
  }

  ngOnInit(): void {
    // Get the contacts from the manager
    this.contacts = this.manager.getContacts()
  }

  details(id: number): void {
    // Navigate to the details page with the contact id
    this.router.navigate(['details', id]);
  }

  newContact(): void {
    // Create a new contact on the details page
    this.router.navigate(['details', -1]);
  }

  import(): void {
    // Navigate to the import page
    this.router.navigate(['import']);
  }

  export(): void {
    // Navigate to the export page
    this.router.navigate(['export']);
  }

  sort() : void {
    // Sort the contacts
    this.manager.sortContacts(this.sortParams.field, this.sortParams.order);
  }
}

export class SortParams {
  constructor(public field: string, public order: string) {}
}
