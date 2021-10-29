import { Component, OnInit } from '@angular/core';
export interface Manufacturer{
    name:string,
    url:string,
    logoUrl:string,
}

@Component({
    selector: 'baseinfo',
    templateUrl: './baseinfo.component.html',
    styleUrls: ['./baseinfo.component.scss']
})
export class BaseinfoComponent implements OnInit {

    switchToEditPrice = false;
    price: number = 0
    simpleProduct: boolean = true;

    titleText: string = ""
    placeholderFortitle = "Título/nome do produto"
    refText: string = ""
    placeholderForRef = 'Referência do produto'
    priceText: string = ""
    placeholderForPrice = "Preço"

    placeholderForManufactor = "Escolha Uma Marca"

    Manufactors:Manufacturer[]=[
        {
            name:'Ambutech',
            url: 'https://ambutech.com/',
            logoUrl:'https://pbs.twimg.com/profile_images/447814806771216384/bJ6wLJOn_400x400.png'

        },
        {
            name:'Freedom Scientific ',
            url: 'https://www.freedomscientific.com/',
            logoUrl:'https://www.freedomscientific.com/assets/images/freedom-scientific-logo.png'
        }
    ]
    labelBy='name'
    valueBy='item'

    hiddenModal:boolean = true
    titleForModal:string = 'Novo Fabricante'


    constructor() { }

    ngOnInit(): void {
    }

    // editText() {
    //     console.log("~ titleText", this.titleText);
    // }

    // editRef() {

    //     console.log("~ refText", this.refText);
    // }

    editPrice(evt:string) {

        this.priceText = evt + '€'
        this.price = +evt
    }

    switch(){
        this.hiddenModal=!this.hiddenModal;

      }

}
