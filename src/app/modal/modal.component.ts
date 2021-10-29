import { Component, ComponentFactoryResolver, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
    @Input("title") title: string = 'title';
    @Input("hidden") hidden: boolean = true;
    @Output() statechange = new EventEmitter<boolean>();

    @ViewChild('entry', { read: ViewContainerRef, static: true }) entry?: ViewContainerRef;
    body: HTMLElement = document.body;
    containerEnd: boolean = false;
    // theHtmlString: any = "<div class='box'><div><strong>Log:</strong></div><div class='log'></div><app-test></app-test></div><button (click)='switch()'>X</button>"

    constructor(
        // private _resolver: ComponentFactoryResolver
        ) {
    }

    ngOnInit(): void {
        // this.test()
    }
    ngOnChanges(changes: SimpleChanges) {
        // if (changes.hidden.previousValue == true){
        //     // this.body.style.position = 'fixed'
        //     // this.body.style.width = '100%';
        //     // this.body.style.height ='100%';
        // }
        // if (changes.hidden.previousValue == false)
        //     this.body.style.position = 'static'
    }
    // test() {

    //     const factory = this._resolver.resolveComponentFactory(TestComponent);
    //     const component = this.entry?.createComponent(factory);
    // }

    switch() {
        this.hidden = !this.hidden
        console.log("~ this.hidden", this.hidden);
        this.statechange.emit(this.hidden)
    }

    onScroll(event: any) {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight && !this.containerEnd) {
            this.containerEnd = true
            console.log("End");
        }
        else {
            this.containerEnd = false;
        }
    }
}
