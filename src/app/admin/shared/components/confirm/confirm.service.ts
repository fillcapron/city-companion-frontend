import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmComponent } from "./confirm.component";

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {

    constructor(private dialog: MatDialog) { }

    confirm(
        msg: string,
        btnOk: string = 'Ok',
        btnCancel: string = 'Cancel'
    ) {
        return this.dialog.open(ConfirmComponent, {
            panelClass: 'panel-confirm',
            width: '350px',
            height: '150px',
            
            disableClose: false,
            data: {
                msg,
                btnOk,
                btnCancel
            }
        });
    }
}