import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteNavigationComponent } from './site-navigation.component';
import { ReactiveFormsModule } from '@angular/forms';

// Do not remove this. It says what angular modules are used in this components
// import {
//   MatButtonModule,
//   MatIconModule,
//   MatInputModule,
//   MatCheckboxModule,
//   MatListModule,
//   MatTableModule,
//   MatPaginatorModule,
//   MAT_DIALOG_DEFAULT_OPTIONS,
//   MatDialogModule,
//   MatDialogRef,
//   MAT_DIALOG_DATA,
//   MatAutocompleteModule,
//   MatSortModule,
//   MatMenuModule
// } from '@angular/material';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ListMenusComponent } from './list-menus/list-menus.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { UpdateMenusComponent } from './update-menus/update-menus.component';
import { LinkService } from '../../core/site-navigation/link.service';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularMaterialModule } from '../../angular-material.module';
import { fakeBackendProvider } from '../../core/interceptors/FakeBackendInterceptor';

const routes: Routes = [
  {
    path: '',
    component: ListMenusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    SiteNavigationComponent,
    ListMenusComponent,
    CreateLinkComponent,
    UpdateMenusComponent
  ],
  exports: [SiteNavigationComponent],
  providers: [
    LinkService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    fakeBackendProvider
  ],
  entryComponents: [CreateLinkComponent, UpdateMenusComponent]
})
/**
 * Navigation management module.
 */
export class SiteNavigationModule {}
