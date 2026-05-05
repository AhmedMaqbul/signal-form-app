import { Component } from '@angular/core';
import { Form } from './form/form';

@Component({
  selector: 'app-root',
  imports: [Form],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
