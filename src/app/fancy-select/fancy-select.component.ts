
import { Component, ElementRef, forwardRef, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fselect',
    templateUrl: './fancy-select.component.html',
    styleUrls: ['./fancy-select.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FancySelect),
        multi: true
    }]
})
export class FancySelect implements ControlValueAccessor, AfterViewInit {
    @Input() list: any[] | string[] = [];
    @Input('valueBy') valueSelectedBy: 'index' | 'value' | string = 'index';
    @Input('labelfrom') labelSelectedFrom: null | string = null;
    @Input() placeholder = 'Escolha uma opção';
    @Input('nooption') noOption = 'Nenhuma escolha disponível';


    @ViewChild('selected') selected?: ElementRef
    @ViewChild('gaveta') gaveta?: ElementRef
    @ViewChild('mini') mini?: ElementRef
    @ViewChild('searchBox') searchBox?: ElementRef

    selectedel?: HTMLElement
    gavetaEl?: HTMLElement
    miniEl?: HTMLElement
    searchBoxEl?: HTMLElement

    @Output() change = new EventEmitter<string>()

    selectedItem: string = ""
    myInput: string = ''
    imDisabled: boolean = false;
    value: any | string | number = 0;
    opaque: number = 0
    previousValue: number = 0;
    time = 500
    pressed = true
    inView = true

    constructor() {

    }


    ngAfterViewInit() {
        this.selectedel = this.selected?.nativeElement
        this.gavetaEl = this.gaveta?.nativeElement
        this.miniEl = this.mini?.nativeElement
        this.searchBoxEl = this.searchBox?.nativeElement
    }

    onChange = (_: any | string | number) => { };
    onTouched = () => { };

    writeValue(value: any | string | number): void {
        this.value = value;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.imDisabled = isDisabled;
    }

    onKeydown(ev: any) {
        if (!this.pressed) {
            return
        }
        this.pressed = !this.pressed
        setTimeout(() => { this.pressed = true; }, this.time);
        this.keybinds(ev)

        if (this.time <= 150) {
            return
        }

        this.time -= 50


    }

    onBlur() {
        this.opaque = 0
    }

    sendBack(value: any) {
        this.change.emit(value);
    }

    keybinds(ev: any) {
        if (this.value < 0)
            this.value = 0


        if (this.filtered_data.length <= this.value) {
            this.value = this.filtered_data.length
        }
        if (this.miniEl) {
            if (ev.key == 'ArrowDown') {
                this.value = this.value + 1;

                this.gavetaEl?.scrollTo({
                    top: this.gavetaEl?.scrollTop + this.miniEl.offsetHeight,
                    behavior: 'smooth'
                });
            }
            if (ev.key == 'ArrowUp') {
                this.value = this.value - 1;

                this.gavetaEl?.scrollTo({
                    top: this.gavetaEl?.scrollTop - this.miniEl.offsetHeight,
                    behavior: 'smooth'
                });
            }
        }
        if (ev.key == 'Enter') {
            try {
                this.imAChangedManByIndex(this.value)
                this.searchBoxEl?.blur()
            } catch {
                console.error('invalid value')
            }

        }

    }
    hoverFn(i: number) {
        this.value = i
    }


    imAChangedManByIndex(index: number) {


        this.value = index;
        this.previousValue = this.checkMyPos(this.filtered_data[index])

        this.defineEventData()


        this.onChange(this.previousValue);
        this.selected?.nativeElement.blur()
        this.selectedItem = this.filtered_data[index]

        this.myInput = this.filtered_data[index]

        if (this.previousValue == -1) {
            this.myInput = ''
            return
        }

    }


    defineEventData() {
        try {
            if (typeof this.list[this.previousValue] == 'string' || typeof this.list[this.previousValue] == 'number') {
                if (this.valueSelectedBy == 'index') {
                    this.change.emit(this.previousValue as unknown as string)
                } else if (this.valueSelectedBy == 'value') {
                    this.change.emit(this.list[this.previousValue])
                }
            } else if (this.labelSelectedFrom)
                if (this.list[this.previousValue][this.valueSelectedBy])
                    this.change.emit(this.list[this.previousValue][this.valueSelectedBy])
                else {

                    this.change.emit(this.list[this.previousValue])
                }

        } catch (error) {
            this.change.emit(undefined)
        }
    }

    checkMyPos(value: string) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.labelSelectedFrom && (typeof this.list[i] != 'string' && typeof this.list[i] != 'number')) {
                if (this.checkMyPosExtended(value, this.list[i][this.labelSelectedFrom]))
                    return i
            }
            else {
                if (this.checkMyPosExtended(value, this.list[i]))
                    return i
            }
        }
        return -1

    }

    checkMyPosExtended(value: string, arrayValue: any) {
        if (value == arrayValue) {
            return true
        }
        return false
    }

    miniStupify(input: string) {
        if (input) {
            return input.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 -]/g, '').replace(/\s\s+/g, ' ')
        } else
            return input
    }

    CompareMe(data: string, input: string) {
        if (data.includes(input))
            return true
        else
            return false

    }

    retryYourInput() {

        this.myInput = ''
        setTimeout(() => {
            if (this.miniEl)
                this.gavetaEl?.scrollTo(0, this.miniEl.offsetHeight * this.previousValue)
        }, 100);


    }



    get filtered_data() {
        return this.DataManagement(this.list)
    }


    DataManagement(data: any[]) {
        let novalue: any
        let newList: any[]

        if (this.myInput != '') {
            let dumbInput = this.miniStupify(this.myInput)

            if (this.labelSelectedFrom) {

                newList = data.filter((n) => {
                    if (this.labelSelectedFrom)
                        return this.dataManagementExtension(n[this.labelSelectedFrom], dumbInput)
                }).map((e) => {
                    if (this.labelSelectedFrom)
                        if (typeof e[this.labelSelectedFrom] != 'string' && typeof e[this.labelSelectedFrom] != 'number') {
                            return 'N/A'
                        } else {
                            return e[this.labelSelectedFrom]
                        }
                })

                novalue = []
            } else {

                newList = data.filter((n) => {
                    return this.dataManagementExtension(n, dumbInput)

                })
                novalue = []
            }
            if (newList.length == 0) {
                return novalue
            }
            return newList

        }

        return this.list.map((e) => {
            if (typeof e == 'string' || typeof e == 'number') {
                return e
            }
            if (this.labelSelectedFrom) {
                if (!e[this.labelSelectedFrom]) {
                    return 'N/A'
                } else {
                    return e[this.labelSelectedFrom]
                }
            }

        })
    }

    dataManagementExtension(n: any, dumbInput: string) {
        n = n.toString()
        if (this.myInput.length == 1) {
            try {
                return this.CompareMe(this.miniStupify(n.charAt(0)), dumbInput[0])
            } catch (error) {
                console.warn('not valid')
            }
        }
        else {
            try {

                return this.CompareMe(this.miniStupify(n), dumbInput)
            } catch (error) {
                console.warn('not valid')
            }
        }
        return n
    }

    CheckIfElementIsBellow() {

        this.opaque = 1
        let rect = this.gavetaEl?.getBoundingClientRect()

        if (rect) {
            this.inView = (!(
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom + 200 <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            ))
        }
    }

}
