import { NgModule } from '@angular/core';

import {
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  MatBadgeModule,
  MatIconModule,
  MatProgressBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

const modules = [
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatButtonModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  LayoutModule,
  MatMenuModule,
  MatBadgeModule,
  MatIconModule,
  MatProgressBarModule,
  MatInputModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class AngularMaterialModule { }
