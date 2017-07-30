import { Directive, HostListener, HostBinding, OnInit, ElementRef } from '@angular/core';

@Directive({ selector: '[toggle]' })
export class ToggleDirective implements OnInit{
    @HostListener('click') toggleOpen() {
        console.log(this.isToggled);
        this.toggle();
        this.isToggled = !this.isToggled;
    }

    private isToggled = true;
    private inputElement: HTMLElement; 
    private previousSibling: Element; 
    private nextSibling: Element; 

    constructor(private elementRef: ElementRef) {}
    
    private toggle() {
        if (this.isToggled) {
            this.nextSibling.classList.add('hidden');
            this.previousSibling.classList.add('hidden');
        } else {
            this.nextSibling.classList.add('visible');
            this.previousSibling.classList.add('visible');
        }
    }

    ngOnInit() {
        this.inputElement = this.elementRef.nativeElement;
        this.previousSibling = this.inputElement.previousElementSibling; 
        this.nextSibling = this.inputElement.nextElementSibling;
    }
}