import { Component, Input, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'vt-tablet',
    templateUrl: './tablet.component.html',
    styleUrls: ['./tablet.component.css'],
    directives: [
      CORE_DIRECTIVES,
    ]
})

export class TabletComponent implements OnInit {
  @Input() title: string;
  @Input() data;

  keyspace: string;
  shard: string;
  tabletType: string;
  hostname: string;
  lag: number;
  qps: number
  serving: boolean;
  error: string;
  lastError: string;

  ngOnInit() {
    this.parseData();
  }

  // parseData goes through the input TabletStats object and stores it to display.
  parseData() {
    // TODO(pkulshre): test/update this when backend JSON encoder changed.
    this.hostname = this.data.Tablet.hostname;
    this.lag = (typeof this.data.Stats.secondsBehindMaster === 'undefined') ? 0 : this.data.Stats.secondsBehindMaster;
    this.qps = (typeof this.data.Stats.qps === 'undefined') ? 0 : this.data.Stats.qps;
    this.serving = (typeof this.data.Serving === 'undefined') ? true : this.data.Serving;
    this.error = (typeof this.data.Stats.healthError === 'undefined') ? 'None' : this.data.Stats.healthError;
    this.lastError = (this.data.LastError == null) ? 'None' : this.data.LastError;
    // TODO(pkulshre): link this popup to tablet view on dashboard.
  }
}
