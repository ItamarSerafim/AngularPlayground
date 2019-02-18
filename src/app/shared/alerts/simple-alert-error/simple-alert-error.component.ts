import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-simple-alert-error',
  templateUrl: './simple-alert-error.component.html',
  styleUrls: ['./simple-alert-error.component.scss']
})
export class SimpleAlertErrorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SimpleAlertErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
