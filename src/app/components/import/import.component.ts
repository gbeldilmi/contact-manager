import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ManagerService, Contact } from '../../services/manager.service'


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styles: []
})

export class ImportComponent {
  public fileContent: string;
  public format: string;
  public out: string;

  constructor(private manager: ManagerService, private router: Router) {
    this.fileContent = '';
    this.format = '';
    this.out = '';
  }

  back(): void {
    // Navigate back to the list
    this.router.navigate(['list']);
  }
  
  loadFile(event: Event): void {
    // Define the supported formats
    let supportedFormats = ['csv'];
    // Get the file from the input element
    if (!(event.target instanceof HTMLInputElement) || !event.target.files) {
      this.out = 'Invalid input';
      return;
    }
    let file = event.target.files[0];
    if (!file) {
      this.out = 'No file selected';
      return;
    }
    // Get the file extension and check if it is supported
    let format = file.name.split('.').pop();
    if (!format || !supportedFormats.includes(format)) {
      this.out = 'Unsupported format';
      return;
    }
    // Read the file content
    let reader = new FileReader();
    reader.onload = () => {
      this.fileContent = reader.result as string;
    };
    reader.readAsText(file);
    this.format = format;
  }

  importContacts(): void {
    // Import the contacts from the selected format
    if (!this.format) {
      this.out = 'No file selected';
      return;
    }
    if (!this.fileContent) {
      this.out = 'File already imported';
      return;
    }
    this.manager.importContacts(this.format, this.fileContent);
    this.fileContent = ''; // Don't import the same file twice
    this.out = 'Contacts imported successfully';
  }
}
