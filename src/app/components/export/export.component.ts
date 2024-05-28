import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ManagerService } from '../../services/manager.service'


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styles: []
})

export class ExportComponent {
  public exportFormat: string;
  public out: string;

  constructor(private manager: ManagerService, private router: Router) {
    this.exportFormat = 'csv';
    this.out = '';
  }

  back(): void {
    // Navigate back to the list
    this.router.navigate(['list']);
  }

  exportContacts() {
    // Export the contacts in the selected format and download the file
    let content = this.manager.exportContacts(this.exportFormat);
    let blob = new Blob([content], {type: 'text/plain'});
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.' + this.exportFormat;
    a.click();
    window.URL.revokeObjectURL(url);
    this.out = 'Contacts exported successfully';
  }
}
