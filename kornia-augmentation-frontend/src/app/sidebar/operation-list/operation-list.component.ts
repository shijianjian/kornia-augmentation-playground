import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { KorniaFormDataControl } from 'src/app/data/utils';
import { AugmentationStatusService } from 'src/app/data/augmentation-status.service';
import { Subscription } from 'rxjs';
import { AugmentationService } from 'src/app/augmentation.service';

@Component({
  selector: 'kornia-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.css']
})
export class OperationListComponent implements OnInit, OnDestroy {

  isDebugMode = false;

  codes: string = "";
  codes_sub: Subscription;
  operationList = [];
  operationListSub: Subscription;
  objectKeys = Object.keys;

  isDisplayingCode = false;
  operationformData: KorniaFormDataControl[] = [];

  @Input() set operationData(value: KorniaFormDataControl[]) {
    this.operationformData = []
    value.forEach((v, i) => {
      this.addOperation(v);
    })
  }
  get operationData() {
    return this.operationformData;
  }
  @Output() operationDataChanged = new EventEmitter<object[]>();
  @Output() listCleared = new EventEmitter<boolean>();
  @Output() getCode = new EventEmitter<boolean>();

  constructor(
    private augmentationStatusService: AugmentationStatusService,
    private augmentationService: AugmentationService,
  ) {}

  ngOnInit() {
    this.codes_sub = this.augmentationService.codes.subscribe(data => this.codes = data['code']);
    this.operationListSub = this.augmentationStatusService.getOperationList().subscribe(
      data => this.operationList = data);
  }

  ngOnDestroy() {
    this.codes_sub.unsubscribe();
    this.operationListSub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.operationformData, event.previousIndex, event.currentIndex);
    this.onAugmentationListUpdated();
  }

  addOperation(operation: KorniaFormDataControl) {
    this.operationformData.push(operation);
  }

  onFormUpdated(data, idx: number) {
    if (idx < this.operationformData.length) {
      this.operationformData[idx] = data
    } else {
      this.operationformData.push(data);
    }
    this.onAugmentationListUpdated();
  }

  onFormDeleted(event, idx: number) {
    if (event['value']) {
      this.operationformData.splice(idx, 1);
      this.onAugmentationListUpdated();
    }
  }

  onAugmentationListUpdated() {
    this.operationDataChanged.emit(this.operationformData);
  }

  onItemSelected(event) {
    let op = new KorniaFormDataControl(event, null);
    this.addOperation(op);
  }

  onClearAll() {
    if (confirm("You are going to delete all operations.")) {
      this.operationformData = [];
      this.augmentationService.clearCurrentResults();
      this.onAugmentationListUpdated();
    }
  }

  onGetCode() {
    if (!this.isDisplayingCode) {
      this.augmentationService.getAugmentationCode();
    }
    this.isDisplayingCode = !this.isDisplayingCode;
  }

  onGetModel() {

  }

  onRunIndex(idx) {
    this.augmentationService.clearCurrentResults();
    this.augmentationService.computeAugmentation([idx]);
  }

}
