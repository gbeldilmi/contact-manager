import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ManagerService {
  private contacts: Contact[];
  private nextId: number;

  constructor() {
    this.contacts = [];
    this.nextId = 1;
  }

  importContacts(format: string, content: string): void {
    // Import the contacts from the given content in the given format
    let data = [];
    switch (format) {
      case 'json':
        data = JSON.parse(content);
        break;
      case 'csv':
        // Skip first line
        let lines = content.split('\n');
        lines.splice(0, 1)
        data = lines.map(el => el.split(','));
        break;
    }
    data.forEach((el: any[]) => {
      if (el.length === 5) {
        this.contacts.push(new Contact(this.nextId++, new ContactData(el[0], el[1], el[2], el[3], el[4])));
      }
    });
  }

  exportContacts(format: string): string {
    // Export the contacts in the given format and return the content as a string
    let content = '';
    switch (format) {
      case 'json':
        content = JSON.stringify(this.contacts);
        break;
      case 'csv':
        content = 'First Name,Last Name,Phone,Email,Birthday\n';
        this.contacts.forEach(el => {
          content += `${el.data.firstName},${el.data.lastName},${el.data.phone},${el.data.email},${el.data.birthday}\n`;
        });
        break;
      case 'sql':
        content = 'CREATE TABLE contacts IF NOT EXISTS (\n'
                  + 'id INT PRIMARY KEY NOT NULL,\n'
                  + 'first_name VARCHAR2(50),\n'
                  + 'last_name VARCHAR2(50),\n'
                  + 'phone VARCHAR2(20),\n'
                  + 'email VARCHAR2(250),\n'
                  + 'birthday VARCHAR2(20)\n'
                  + ');\n';
        this.contacts.forEach(el => {
          content += `INSERT INTO contacts VALUES (${el.id}, '${el.data.firstName}', '${el.data.lastName}', '${el.data.phone}', '${el.data.email}', '${el.data.birthday}')\n`;
        });
        break;
      case 'vcf':
        this.contacts.forEach(el => {
          content += `BEGIN:VCARD\n`
                    + `VERSION:3.0\n`
                    + `N:${el.data.lastName};${el.data.firstName};;;\n`
                    + `FN:${el.data.firstName} ${el.data.lastName}\n`
                    + `TEL;TYPE=CELL:${el.data.phone}\n`
                    + `EMAIL:${el.data.email}\n`
                    + `BDAY:${el.data.birthday}\n`
                    + `END:VCARD\n`;
        });
        break;
    }
    return content;
  }

  private getContactIndex(id: number): number {
    // Get the index of the contact identified by the given id
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  getContact(id: number): Contact | null {
    // Get the contact identified by the given id
    let idx = this.getContactIndex(id);
    if (idx === -1) {
      return null;
    }
    return this.contacts[idx];
  }

  getContacts() : Contact[] {
    // Return a copy of the contacts
    return this.contacts;
  }

  newContact(data: ContactData): Contact {
    // Create a new contact with the given data
    this.contacts.push(new Contact(this.nextId++, data));
    return this.contacts[this.contacts.length - 1];
  }

  deleteContact(id: number): void {
    // Delete the contact identified by the given id
    let idx = this.getContactIndex(id);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
    }
  }

  updateContact(contact: Contact): void {
    // Update the contact identified by the id of the given contact
    let idx = this.getContactIndex(contact.id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
    }
  }

  sortContacts(field: string, order: string): void {
    // Sort the contacts by the given field and order
    let f = -1;
    switch (field) {
      case 'birthday':
        f = 4;
        break;
      case 'firstName':
        f = 0;
        break;
      case 'lastName':
        f = 1;
        break;
      case 'phone':
        f = 2;
        break;
      case 'email':
        f = 3;
    }
    let o = order === 'asc' ? 1 : -1;
    if (f === -1) {
      return;
    }
    this.contacts.sort((a, b) => {
      switch (f) {
        case 4:
          return a.data.birthday.localeCompare(b.data.birthday) * o;
        case 0:
          return a.data.firstName.localeCompare(b.data.firstName) * o;
        case 1:
          return a.data.lastName.localeCompare(b.data.lastName) * o;
        case 2:
          return a.data.phone.localeCompare(b.data.phone) * o;
        case 3:
          return a.data.email.localeCompare(b.data.email) * o;
        default:
          return 0;
      }
    });
  }
}

export class ContactData {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public email: string,
    public birthday: string
  ) {}
}

export class Contact {
  constructor(
    public id: number,
    public data: ContactData
  ) {}
}
