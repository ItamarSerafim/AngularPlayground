
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Link, LinkService } from '../../../core/site-navigation/link.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-menus',
  templateUrl: './update-menus.component.html',
  styleUrls: ['./update-menus.component.scss']
})
export class UpdateMenusComponent implements OnInit {

  linksForm: FormGroup;
  codepoints = <any>[];
  codepointsObservable: Observable<any[]>;
  isLoading: Boolean;

  constructor(
    // private menuService: MenuService/*TODO: server persistence*/,
    private linkService: LinkService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateMenusComponent>,
    @Inject(MAT_DIALOG_DATA) public link: Link,
    private http: HttpClient
  ) {

      this.linksForm = fb.group({
        id: [link.id],
        title: [link.title, Validators.required],
        description: [link.description, Validators.required],
        path: [link.path, Validators.required],
        disable:  [link.disable],
        expanded:  [link.expanded],
        icon:  [link.icon],
        iconUrl: [link.iconUrl],
        showAt: [link.showAt],
        order: [link.order]
      });

  }
  ngOnInit(){

    // TODO: Create a service for this.
    this.http.get('assets/json/icons-codepoints.json').
    subscribe((results) => {
      this.codepoints = results;
      this.linksForm.get('icon').valueChanges.
      subscribe(value => {
        this.codepointsObservable = of(this._filter(value));
      });
    });
  }

  private _filter(filterTerm: string) {
    const filterTermLc = (filterTerm || '').toLowerCase();
    const topValues = [];
    const arrayOfSomething = this.codepoints.filter((value: string) => {
      const match = (value && value[0]).toLowerCase().indexOf(filterTermLc) > -1;
      if (!match) { return false; }
      const startsWith = (value && value[0]).toLowerCase().startsWith(filterTermLc);
      if (startsWith) {
        topValues.push(value);
        return false;
      }
      return match;
    });

    return [...topValues, ...arrayOfSomething];
  }

  submit() {

    if (this.linksForm.invalid) { return; }
    this.linkService.update(this.linksForm.value).
      subscribe((updated) => {
        console.log('updated:\t', updated);
        if (updated) {
          alert('Dados atualizados com sucesso');
          this.dialogRef.close();
        } else {
          alert('This item wasn\'t updated!');
        }
      },
      error => alert(error));
  }

}
